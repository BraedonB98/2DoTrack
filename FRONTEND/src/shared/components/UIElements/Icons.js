import React, { useState, useEffect } from "react";
import {
  AiFillAmazonCircle,
  AiFillAndroid,
  AiFillApple,
  AiFillBook,
  AiFillBug,
  AiFillCalculator,
  AiFillCalendar,
  AiFillCamera,
  AiFillCar,
  AiFillClockCircle,
  AiFillContacts,
  AiFillControl,
  AiFillCopyrightCircle,
  AiFillCreditCard,
  AiFillCrown,
  AiFillCustomerService,
  AiFillDashboard,
  AiFillDatabase,
  AiFillDelete,
  AiFillEdit,
  AiFillFacebook,
  AiFillFastBackward,
  AiFillFastForward,
  AiFillFileAdd,
  AiFillFileExcel,
  AiFillFileExclamation,
  AiFillFileImage,
  AiFillFilePpt,
  AiFillFileText,
  AiFillFire,
  AiFillFlag,
  AiFillFolderOpen,
  AiFillFormatPainter,
  AiFillFrown,
  AiFillFund,
  AiFillGift,
  AiFillGithub,
  AiFillGitlab,
  AiFillGoogleCircle,
  AiFillHeart,
  AiFillHighlight,
  AiFillHome,
  AiFillHourglass,
  AiFillIdcard,
  AiFillInfoCircle,
  AiFillInstagram,
  AiFillLayout,
  AiFillLike,
  AiFillLinkedin,
  AiFillLock,
  AiFillMedicineBox,
  AiFillMeh,
  AiFillMessage,
  AiFillMobile,
  AiFillPhone,
  AiFillPicture,
  AiFillPieChart,
  AiFillPrinter,
  AiFillRead,
  AiFillRobot,
  AiFillRocket,
  AiFillSetting,
  AiFillShop,
  AiFillShopping,
  AiFillSignal,
  AiFillSkin,
  AiFillSlackCircle,
  AiFillSliders,
  AiFillSmile,
  AiFillTablet,
  AiFillTags,
  AiFillThunderbolt,
  AiFillTool,
  AiFillUsb,
  AiFillVideoCamera,
  AiFillWallet,
  AiOutlineConsoleSql,
} from "react-icons/ai";
import { BsFillBagFill, BsFillTrashFill } from "react-icons/bs";

const icons = [
  {
    name: "amazon",
    search: ["amazon"],
    value: <AiFillAmazonCircle />,
  },
  {
    name: "android",
    search: ["android"],
    value: <AiFillAndroid />,
  },
  {
    name: "apple",
    search: ["apple"],
    value: <AiFillApple />,
  },
  {
    name: "bag",
    search: ["bag"],
    value: <BsFillBagFill />,
  },
  {
    name: "book",
    search: ["book"],
    value: <AiFillBook />,
  },
  {
    name: "bug",
    search: ["bug"],
    value: <AiFillBug />,
  },
  {
    name: "calculator",
    search: ["calculator"],
    value: <AiFillCalculator />,
  },
  {
    name: "calendar",
    search: ["calendar"],
    value: <AiFillCalendar />,
  },
  {
    name: "camera",
    search: ["camera"],
    value: <AiFillCamera />,
  },
  {
    name: "car",
    search: ["car"],
    value: <AiFillCar />,
  },
  {
    name: "clock circle",
    search: ["clock", "circle"],
    value: <AiFillClockCircle />,
  },
  {
    name: "contacts",
    search: ["contacts"],
    value: <AiFillContacts />,
  },
  {
    name: "control",
    search: ["calendar"],
    value: <AiFillControl />,
  },
  {
    name: "copyrightcircle",
    search: ["copy", "right", "circle", "copyright", "copyrightcircle"],
    value: <AiFillCopyrightCircle />,
  },
  {
    name: "creditcard",
    search: ["credit", "card", "creditcard"],
    value: <AiFillCreditCard />,
  },
  {
    name: "crown",
    search: ["crown"],
    value: <AiFillCrown />,
  },
  {
    name: "customerservice",
    search: ["customerservice", "customer", "service"],
    value: <AiFillCustomerService />,
  },
  {
    name: "dashboard",
    search: ["dashboard"],
    value: <AiFillDashboard />,
  },
  {
    name: "database",
    search: ["database"],
    value: <AiFillDatabase />,
  },
  {
    name: "delete",
    search: ["delete"],
    value: <AiFillDelete />,
  },
  {
    name: "edit",
    search: ["edit"],
    value: <AiFillEdit />,
  },
  {
    name: "facebook",
    search: ["facebook", "social", "media", "socialmedia"],
    value: <AiFillFacebook />,
  },
  {
    name: "fastbackward",
    search: ["fastbackword"],
    value: <AiFillFastBackward />,
  },
  {
    name: "fastforward",
    search: ["fastforward"],
    value: <AiFillFastForward />,
  },
  {
    name: "fileadd",
    search: ["fileadd"],
    value: <AiFillFileAdd />,
  },
  {
    name: "fileexcel",
    search: ["fileexcel"],
    value: <AiFillFileExcel />,
  },
  {
    name: "fileexclamation",
    search: ["fileexlamation"],
    value: <AiFillFileExclamation />,
  },
  {
    name: "fileimage",
    search: ["fileimage"],
    value: <AiFillFileImage />,
  },
  {
    name: "fileppt",
    search: ["fileppt"],
    value: <AiFillFilePpt />,
  },
  {
    name: "filetext",
    search: ["filetext"],
    value: <AiFillFileText />,
  },
  {
    name: "fire",
    search: ["fire"],
    value: <AiFillFire />,
  },
  {
    name: "flag",
    search: ["flag"],
    value: <AiFillFlag />,
  },
  {
    name: "folderopen",
    search: ["folderopen"],
    value: <AiFillFolderOpen />,
  },
  {
    name: "formatpainter",
    search: ["formatpainter"],
    value: <AiFillFormatPainter />,
  },
  {
    name: "frown",
    search: ["frown", "face", "sad"],
    value: <AiFillFrown />,
  },
  {
    name: "fund",
    search: ["fund", "money"],
    value: <AiFillFund />,
  },
  {
    name: "gift",
    search: ["gift"],
    value: <AiFillGift />,
  },
  {
    name: "github",
    search: ["github"],
    value: <AiFillGithub />,
  },
  {
    name: "gitlab",
    search: ["gitlab"],
    value: <AiFillGitlab />,
  },
  {
    name: "googlecircle",
    search: ["google", "circle", "googlecircle"],
    value: <AiFillGoogleCircle />,
  },
  {
    name: "heart",
    search: ["heart"],
    value: <AiFillHeart />,
  },
  {
    name: "highlight",
    search: ["highlight", "office"],
    value: <AiFillHighlight />,
  },
  {
    name: "home",
    search: ["home", "house"],
    value: <AiFillHome />,
  },
  {
    name: "hourglass",
    search: ["hourglass"],
    value: <AiFillHourglass />,
  },
  {
    name: "idcard",
    search: ["idcard"],
    value: <AiFillIdcard />,
  },
  {
    name: "infocircle",
    search: ["info", "circle", "infocircle"],
    value: <AiFillInfoCircle />,
  },
  {
    name: "instagram",
    search: ["instagram", "socialmedia"],
    value: <AiFillInstagram />,
  },
  {
    name: "layout",
    search: ["layout"],
    value: <AiFillLayout />,
  },
  {
    name: "like",
    search: ["like"],
    value: <AiFillLike />,
  },
  {
    name: "linkedin",
    search: ["linkedin", "socialmedia"],
    value: <AiFillLinkedin />,
  },
  {
    name: "lock",
    search: ["lock"],
    value: <AiFillLock />,
  },
  {
    name: "medicinebox",
    search: ["medicinebox", "health"],
    value: <AiFillMedicineBox />,
  },
  {
    name: "meh",
    search: ["meh", "face"],
    value: <AiFillMeh />,
  },
  {
    name: "message",
    search: ["message"],
    value: <AiFillMessage />,
  },
  {
    name: "mobile",
    search: ["mobile"],
    value: <AiFillMobile />,
  },
  {
    name: "phone",
    search: ["phone"],
    value: <AiFillPhone />,
  },
  {
    name: "picture",
    search: ["picture"],
    value: <AiFillPicture />,
  },
  {
    name: "piechart",
    search: ["piechart", "data"],
    value: <AiFillPieChart />,
  },
  {
    name: "printer",
    search: ["printer"],
    value: <AiFillPrinter />,
  },
  {
    name: "read",
    search: ["read"],
    value: <AiFillRead />,
  },
  {
    name: "robot",
    search: ["robot"],
    value: <AiFillRobot />,
  },
  {
    name: "rocket",
    search: ["rocket"],
    value: <AiFillRocket />,
  },
  {
    name: "setting",
    search: ["setting"],
    value: <AiFillSetting />,
  },
  {
    name: "shop",
    search: ["shop", "retail"],
    value: <AiFillShop />,
  },
  {
    name: "shopping",
    search: ["shopping"],
    value: <AiFillShopping />,
  },
  {
    name: "signal",
    search: ["signal"],
    value: <AiFillSignal />,
  },
  {
    name: "skin",
    search: ["skin"],
    value: <AiFillSkin />,
  },
  {
    name: "slackcircle",
    search: ["slack", "socialmedia", "slackcircle", "circle"],
    value: <AiFillSlackCircle />,
  },
  {
    name: "sliders",
    search: ["sliders"],
    value: <AiFillSliders />,
  },
  {
    name: "smile",
    search: ["smile", "face"],
    value: <AiFillSmile />,
  },
  {
    name: "tablet",
    search: ["tablet"],
    value: <AiFillTablet />,
  },
  {
    name: "tags",
    search: ["tags"],
    value: <AiFillTags />,
  },
  {
    name: "thunderbolt",
    search: ["thunderbolt"],
    value: <AiFillThunderbolt />,
  },
  {
    name: "tool",
    search: ["tool"],
    value: <AiFillTool />,
  },
  {
    name: "trash",
    search: ["trash"],
    value: <BsFillTrashFill />,
  },
  {
    name: "usb",
    search: ["usb", "flashdrive"],
    value: <AiFillUsb />,
  },
  {
    name: "videocamera",
    search: ["video", "camera", "videocamera"],
    value: <AiFillVideoCamera />,
  },
  {
    name: "wallet",
    search: ["wallet"],
    value: <AiFillWallet />,
  },
  {
    name: "consolesql",
    search: ["consolesql"],
    value: <AiOutlineConsoleSql />,
  },
];
const Icon = (props) => {
  const [iconsState, setIconsState] = useState([]);
  const onClickHandler = (event) => {
    props.onClick(event);
  };
  useEffect(() => {
    setIconsState(
      icons.filter(
        (icon) =>
          icon.search.filter((search) => search.includes(props.search)).length >
          0
      )
    );
  }, [props.search]);

  useEffect(() => {
    setIconsState(icons.filter((icon) => icon.name === props.name));
  }, [props.name]);

  if (props.search) {
    return (
      <React.Fragment>
        {iconsState &&
          iconsState.map((icon) => (
            <div
              className={props.className}
              key={icon.name}
              data-index={icon.name}
              onClick={onClickHandler}
            >
              {icon.value}
            </div>
          ))}
        {iconsState.length === 0 && <p>No items found under this name</p>}
      </React.Fragment>
    );
  } else if (props.name && iconsState.length > 0) {
    return <React.Fragment>{iconsState[0].value}</React.Fragment>;
  } else {
    return <div></div>;
  }
};
export default Icon;
