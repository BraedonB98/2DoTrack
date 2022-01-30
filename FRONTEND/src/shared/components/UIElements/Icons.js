import React,{ useState, useEffect} from "react";
import {AiFillAmazonCircle,AiFillAndroid,AiFillApple,AiFillBook,AiFillBug,AiFillCalculator,AiFillCalendar,AiFillCamera,AiFillCar,AiFillClockCircle,AiFillContacts,AiFillControl,AiFillCopyrightCircle,AiFillCreditCard,AiFillCrown,AiFillCustomerService,AiFillDashboard,AiFillDatabase,AiFillDelete,AiFillEdit,AiFillFacebook,AiFillFastBackward,AiFillFastForward,AiFillFileAdd,AiFillFileExcel,AiFillFileExclamation,AiFillFileImage,AiFillFilePpt,AiFillFileText,AiFillFire,AiFillFlag,AiFillFolderOpen,AiFillFormatPainter,AiFillFrown,AiFillFund,AiFillGift,AiFillGithub,AiFillGitlab,AiFillGoogleCircle,AiFillHeart,AiFillHighlight,AiFillHome,AiFillHourglass,AiFillIdcard,AiFillInfoCircle,AiFillInstagram,AiFillLayout,AiFillLike,AiFillLinkedin,AiFillLock,AiFillMedicineBox,AiFillMeh,AiFillMessage,AiFillMobile,AiFillPhone,AiFillPicture,AiFillPieChart,AiFillPrinter,AiFillRead,AiFillRobot,AiFillRocket,AiFillSetting,AiFillShop,AiFillShopping,AiFillSignal,AiFillSkin,AiFillSlackCircle,AiFillSliders,AiFillSmile,AiFillTablet,AiFillTags,AiFillThunderbolt,AiFillTool,AiFillUsb,AiFillVideoCamera,AiFillWallet, AiOutlineConsoleSql} from "react-icons/ai"

//const icons = [AiFillAmazonCircle,AiFillAndroid,AiFillApple,AiFillBook,AiFillBug,AiFillCalculator,AiFillCalendar,AiFillCamera,AiFillCar,AiFillClockCircle,AiFillContacts,AiFillControl,AiFillCopyrightCircle,AiFillCreditCard,AiFillCrown,AiFillCustomerService,AiFillDashboard,AiFillDatabase,AiFillDelete,AiFillEdit,AiFillFacebook,AiFillFastBackward,AiFillFastForward,AiFillFileAdd,AiFillFileExcel,AiFillFileExclamation,AiFillFileImage,AiFillFilePpt,AiFillFileText,AiFillFire,AiFillFlag,AiFillFolderOpen,AiFillFormatPainter,AiFillFrown,AiFillFund,AiFillGift,AiFillGithub,AiFillGitlab,AiFillGoogleCircle,AiFillHeart,AiFillHighlight,AiFillHome,AiFillHourglass,AiFillIdcard,AiFillInfoCircle,AiFillInstagram,AiFillLayout,AiFillLike,AiFillLinkedin,AiFillLock,AiFillMedicineBox,AiFillMeh,AiFillMessage,AiFillMobile,AiFillPhone,AiFillPicture,AiFillPieChart,AiFillPrinter,AiFillRead,AiFillRobot,AiFillRocket,AiFillSetting,AiFillShop,AiFillShopping,AiFillSignal,AiFillSkin,AiFillSlackCircle,AiFillSliders,AiFillSmile,AiFillTablet,AiFillTags,AiFillThunderbolt,AiFillTool,AiFillUsb,AiFillVideoCamera,AiFillWallet]
const icons = [
    {
        name:"amazon",
        search:["amazon"],
        value:<AiFillAmazonCircle/>
    },
    {
        name:"android",
        search:["android"],
        value:<AiFillAndroid/>
    },
    {
        name:"apple",
        search:["apple"],
        value:<AiFillApple/>
    },
    {
        name:"book",
        search:["book"],
        value:<AiFillBook/>
    },
    {
        name:"bug",
        search:["bug"],
        value:<AiFillBug/>
    },
    {
        name:"calculator",
        search:["calculator"],
        value:<AiFillCalculator/>
    },
    {
        name:"bug",
        search:["calculator"],
        value:<AiFillCalendar/>
    }
]
const Icon = props => {
    const [iconsState,setIconsState] = useState()
    const onClickHandler = event => {
        props.onClick(event)
    }
    useEffect( ()=>{
        setIconsState((icons.filter(icon => icon.search.filter(search => search.includes(props.search)).length!==0)));
        console.log(iconsState);
    },[props.search])
    if(props.search){
        return(
            <React.Fragment>
                { iconsState.map((icon) => <div className={props.className} key={icon.name} data-index={icon.name} onClick={onClickHandler} >{icon.value}</div>) }
            </React.Fragment>
        )
    }
    if(props.name){
        setIconsState(icons.filter(icon=> icon.name === props.name)[0]);
        return(
            <li>(iconsState.value)</li> 
        )
    }
    else
    {
        return(<div></div>);
    }
    
}
export default Icon;