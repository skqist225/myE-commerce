import React from 'react';
import { Visibility } from '@material-ui/icons';
import './widgetsm.css';

const WidgetSm = () => {
    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                <li className="widgetSmListItem">
                    <img
                        src="https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg?cs=srgb&dl=pexels-spotwizardlee-7333831.jpg&fm=jpg"
                        alt=""
                        className="widgetImg"
                    />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Skqist</span>
                        <span className="widgetSmUserTitle">
                            Software Engineer
                        </span>
                    </div>
                    <button>
                        <Visibility className="widgetIcon" />
                        Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img
                        src="https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg?cs=srgb&dl=pexels-spotwizardlee-7333831.jpg&fm=jpg"
                        alt=""
                        className="widgetImg"
                    />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Skqist</span>
                        <span className="widgetSmUserTitle">
                            Software Engineer
                        </span>
                    </div>
                    <button>
                        <Visibility className="widgetIcon" />
                        Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img
                        src="https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg?cs=srgb&dl=pexels-spotwizardlee-7333831.jpg&fm=jpg"
                        alt=""
                        className="widgetImg"
                    />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Skqist</span>
                        <span className="widgetSmUserTitle">
                            Software Engineer
                        </span>
                    </div>
                    <button>
                        <Visibility className="widgetIcon" />
                        Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img
                        src="https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg?cs=srgb&dl=pexels-spotwizardlee-7333831.jpg&fm=jpg"
                        alt=""
                        className="widgetImg"
                    />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Skqist</span>
                        <span className="widgetSmUserTitle">
                            Software Engineer
                        </span>
                    </div>
                    <button>
                        <Visibility className="widgetIcon" />
                        Display
                    </button>
                </li>
                <li className="widgetSmListItem">
                    <img
                        src="https://images.pexels.com/photos/7333831/pexels-photo-7333831.jpeg?cs=srgb&dl=pexels-spotwizardlee-7333831.jpg&fm=jpg"
                        alt=""
                        className="widgetImg"
                    />
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">Skqist</span>
                        <span className="widgetSmUserTitle">
                            Software Engineer
                        </span>
                    </div>
                    <button>
                        <Visibility className="widgetIcon" />
                        Display
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default WidgetSm;
