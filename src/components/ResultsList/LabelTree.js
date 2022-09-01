import styles from "./ResultsList.module.css";
import {Box, Checkbox} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import {getCached} from "../../services/cacheService";
import highlighter from "../../utils/highliter";
import FixedTopParent from "./FixedTopParent";
import DroppInfo from "./DroppInfo";
import jsonDB from "../../Hintsdata.json";

const LabelTree = ({item, handleCachedItem, caches, searchKey}) => {
    const [checked, setChecked] = useState(!!getCached(item.code));

    const handleCheckedItem = () => setChecked(handleCachedItem(item));

    const ref = useRef();

    useEffect(() => {
        setChecked(!!getCached(item.code));
    }, [caches]);

    const hint = getHint(item.code);

    return (
        <FixedTopParent isParent={!item.parent_id} parentRef={ref}>
            <div ref={ref} className={styles.item} onClick={(e) => e.stopPropagation()}>
                <Checkbox className={styles.checkbox} checked={checked} onChange={() => handleCheckedItem(item)} onClick={(e) => e.stopPropagation()} disableRipple/>
                <Box sx={{width: "100%"}}>
                    {!item.parent_id && getDepartmentLabel(item.code)}
                    <div className={styles.itemContent}>
                        <strong dangerouslySetInnerHTML={{__html: highlighter(searchKey, item.code)}}/>
                        <span dangerouslySetInnerHTML={{__html: highlighter(searchKey, item.description)}}/>
                    </div>
                </Box>
            </div>
            {hint && <DroppInfo title="hintweise" content={hint} synonyme={item.synonyme} searchKey={searchKey}/>}
            {!hint && item.synonyme && <DroppInfo title="synonyme" content={item.synonyme} searchKey={searchKey}/>}
        </FixedTopParent>
    );
};

const getDepartmentLabel = (code) => {
    code = parseFloat(code.replace("-", "."));
    let styles = {
        color: "white",
        fontSize: "13px",
        borderRadius: "3px",
        textTransforom: "uppercase",
        paddingRight: "5px",
        paddingLeft: "5px",
        paddingTop: "2px",
        paddingBottom: "2px",
        marginLeft: "2px"
    };

    if (code < 44000000) return <span style={{...styles, backgroundColor: "rgba(244,67,54,0.2)", color: "rgb(244,67,54)"}}>Lieferleistungen</span>;
    if (code > 48000000.8) return <span style={{...styles, backgroundColor: "rgba(0,150,136,0.2)", color: "rgb(0,150,136)"}}>Bauleistungen</span>;
    if (code === 45000000.7) return <span style={{...styles, backgroundColor: "rgba(0,150,136,0.2)", color: "rgb(0,150,136)"}}>Dienstleistungen</span>;
};

const getHint = (code) => {
    return jsonDB.HintsData.find((item) => code.includes(item.code))?.hint;
};

export default LabelTree;
