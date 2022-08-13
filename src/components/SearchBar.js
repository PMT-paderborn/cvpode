import { Button  } from '@mui/material';
import Search from '@mui/icons-material/Search';
import Export from '@mui/icons-material/IosShare';
import TextField from '@mui/material/TextField';

import {React, useState, useEffect, } from 'react';
import "./SearchBar.css";
//import Tree from "./Tree";



function f(code,description){ // html template for each cpv record
  var rdata="";
  //return $code+" "+$description+"\n";
  rdata +='<div class="bd-card">';
  rdata += '<input  class="bd-checkbox" type="checkbox" name="cpvcodes" value='+code+' id="'+code+'"  >';
  rdata += '<label class="bd-label" for="'+code+'" ><b>'+code+' : </b> '+description+'...</label><br/>';
  rdata += '</div>';
  return rdata;
}
function SearchBar({ placeholder }) {

    var cpvcodeslist=[];
    // you need to change this url and/or implement another methord of sending data to the server
    var export_url='http://localhost:8000/api/cpv/export/'; // POST cpvcodeslist to server and get response as a json message variable
    var base_url='http://localhost:8000/';

    const[value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const [bdata, setBdata] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [showBrowser, setShowBrowser] = useState(false);
    const [showError, setShowError] = useState(false);
    const[Errors, setErrors] = useState('');
  
    const onChange = (event) => {
      setValue(event.target.value);
    }
  
    const onExport = () => {
      setShowResults(false);
      setShowError(true);
      setShowBrowser(false);
      setErrors('Exporting Data...');
      //select all checkboxes and get their values 
      var cpvcodeslist=[];
        cpvcodeslist = document.querySelectorAll(".bd-checkbox");
      
      
      var cpvcodes=[];
      for(var i=0;i<cpvcodeslist.length;i++){
        if(cpvcodeslist[i].checked){
          cpvcodes.push(cpvcodeslist[i].value);
        }
      }
  
      setShowBrowser(false);
      setErrors('Exporting Data...');
      localStorage.setItem('cpvcodes',JSON.stringify(cpvcodes));
      setErrors('Data Exported Successfully to LocalStorage');
 
  
    }
  
   
   
  
  
    const getcpv = (cpvcode) => {
      if (cpvcode.length==10){
        setShowResults(false);
        setShowError(false);
        setErrors('');
        
          fetch(base_url+"api/cpv/tree/" + cpvcode)
          .then((response) => response.json())
          .then((actualData) => {
            if(!actualData.error)
            {//console.log(actualData);
              setShowBrowser(true);setShowError(false);
              var datax="";
              
              actualData.forEach(classes => {
                datax+=f(classes.code,classes.description,classes.hasChildren);
  
                if(classes.hasChildren==true)// checking for childerns
                { 
                  datax+='<div class="bd-card-grid">';
                  const cats = Object.entries(classes.children);
                  cats.forEach(categories => {
                    datax+=f(categories[1].code,categories[1].description,classes.hasChildren);
  
                    if(categories[1].hasChildren==true)// checking for childerns
                    {
                      datax+='<div class="bd-card-grid">';
                      const subcats = Object.entries(categories[1].children);
                      subcats.forEach(subcategories => {
                        datax+=f(subcategories[1].code,subcategories[1].description,classes.hasChildren);
                        if(subcategories[1].hasChildren==true)// checking for childerns
                        {
                          datax+='<div class="bd-card-grid">';
                          const subsubcats = Object.entries(subcategories[1].children);
                          subsubcats.forEach(subsubcategories => {
                            datax+=f(subsubcategories[1].code,subsubcategories[1].description,classes.hasChildren);
                            if(subsubcategories[1].hasChildren==true)// checking for childerns
                            {
                              datax+='<div class="bd-card-grid">';
                              const subsubsubcats = Object.entries(subsubcategories[1].children);
                              subsubsubcats.forEach(subsubsubcategories => {
                                datax+=f(subsubsubcategories[1].code,subsubsubcategories[1].description,classes.hasChildren);
                                if(subsubsubcategories[1].hasChildren==true)// checking for childerns
                                {
                                  datax+='<div class="bd-card-grid">';
                                  const subsubsubsubcats = Object.entries(subsubsubcategories[1].children);
                                  subsubsubsubcats.forEach(subsubsubsubcategories => {
                                    datax+=f(subsubsubsubcategories[1].code,subsubsubsubcategories[1].description,classes.hasChildren);
                                    if(subsubsubsubcategories[1].hasChildren==true)// checking for childerns
                                    {
                                      datax+='<div class="bd-card-grid">';
                                      const subsubsubsubsubcats = Object.entries(subsubsubsubcategories[1].children);
                                      subsubsubsubsubcats.forEach(subsubsubsubsubcategories => {
                                        datax+=f(subsubsubsubsubcategories[1].code,subsubsubsubsubcategories[1].description,classes.hasChildren);
                                      });
                                      datax+='</div>';
                                    }
                                  });
                                  datax+='</div>';
                                }
                              });
                              datax+='</div>';
                            }
                          });
                          datax+='</div>';
                        }
                      });
                      datax+='</div>';
                    }
                  });
  
                //console.log(datax);
                  datax+='</div>'; 
                }
                
              });
               
              setBdata(datax);//actualData
            }
            else
            {
              setShowBrowser(false);setShowError(true);
              setErrors(actualData.error);
            }
            
            
          });
        }
        else{
          setShowResults(false);setShowError(false);
        }
      }
      //setShowResults(false); alert(cpvcode);
    
  
  
  
    
    const onSearch= (searchTerm) => {
      if (searchTerm.length>3){
        setShowBrowser(false);
        setShowError(false);
        setShowResults(false);
  
        fetch(base_url+"api/cpv/search/" + searchTerm)
        .then((response) => response.json())
        .then((actualData) => {
          if(!actualData.error)
          {
            setShowResults(true);setShowError(false);
            setItems(actualData)
          }
          else
          {
            setShowResults(false);setShowError(true);
            setErrors(actualData.error);
          }
          
          
        });
      }
      else{
        setShowResults(false);setShowError(false);
      }
      
    }
  
   
  
    // when the user clicks on the search button or auto search, we want to show the results
    //{item.description.substring(0,30)}... 
    const Results = () => ( <div className='SearchResults' >
    <ul className="card-grid">
                {items.map((item) => (
                    <li  key={item.code.toString()} >
                        <article className="card" onClick={() => {getcpv (item.code) }}>
                        {item.code}
                            <div className="card-image"  >
                            {item.description}
                            </div>
                            
                        </article >
                    </li>
                ))}
            </ul>
    </div>
      )
  
  
      /// after clicking the search cpv code
      const BrowserData = () => {
        if(bdata.length>0){
          return(
            <div className='bd-card-grid' dangerouslySetInnerHTML={{__html: bdata}}></div>
          )
        }
      }
   
    return ( // searchbr returns the search bar and the results and the browser data
      <div className="search">
          <div className="searchInputs">
            
              <TextField     variant="outlined" size="large"  label={placeholder} value={value} onChange={onChange}  onKeyUp={() => onSearch(value)}   />
            

              <Button varient="contained" size="large"   onClick={() => onSearch(value)} className="search_btn" >
                <Search />Search</Button>
              <Button varient="contained" size="large"  variant='contained' onClick={() => onExport()} className="export_btn" >
                <Export />Export</Button>
          </div>
  
          <div className='errors' >{ showError ? Errors  : null }</div>
          <div className='search_results'>{showResults ? <Results /> : null }</div>
          <div className='browser_data'>{showBrowser ? <BrowserData /> : null }</div>
      </div>
                
    );
}



export default SearchBar; 