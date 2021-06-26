import React from 'react';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import PublishIcon from '@material-ui/icons/Publish';
import { Link } from 'react-router-dom';
import './user.css';

export default function User() {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to={'/user/add'}>
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img
                            src="https://images.pexels.com/photos/7584344/pexels-photo-7584344.jpeg?cs=srgb&dl=pexels-max-bonda-7584344.jpg&fm=jpg"
                            alt=""
                            className="userShowImg"
                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">
                                Anna Becker
                            </span>
                            <span className="userShowUserTitle">
                                Software Engineer
                            </span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentityIcon className="userShowIcon" />
                            <span className="userShowInfoTitle">anabeck99</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarTodayIcon className="userShowIcon" />

                            <span className="userShowInfoTitle">
                                2000-05-22
                            </span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroidIcon className="userShowIcon" />

                            <span className="userShowInfoTitle">
                                +84353996236
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutlineIcon className="userShowIcon" />

                            <span className="userShowInfoTitle">
                                skqist225@gmail.com
                            </span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearchingIcon className="userShowIcon" />

                            <span className="userShowInfoTitle">
                                HCM, Viet Nam
                            </span>
                        </div>
                    </div>
                </div>
                <div className="userUpdate">
                    <span className="userUpdateTitle">Edit</span>
                    <form action="" className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>username</label>
                                <input
                                    placeholder="username"
                                    type="text"
                                    className="userUpdateInput"
                                ></input>
                            </div>
                            <div className="userUpdateItem">
                                <label>fullname</label>
                                <input
                                    placeholder="fullname"
                                    type="text"
                                    className="userUpdateInput"
                                ></input>
                            </div>
                            <div className="userUpdateItem">
                                <label>email</label>
                                <input
                                    placeholder="email"
                                    type="text"
                                    className="userUpdateInput"
                                ></input>
                            </div>
                            <div className="userUpdateItem">
                                <label>phone number</label>
                                <input
                                    placeholder="phone number"
                                    type="text"
                                    className="userUpdateInput"
                                ></input>
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    src="https://images.pexels.com/photos/7584344/pexels-photo-7584344.jpeg?cs=srgb&dl=pexels-max-bonda-7584344.jpg&fm=jpg"
                                    alt=""
                                    className="userUpdateImg"
                                />
                                <label htmlFor="file">
                                    <PublishIcon className="userUpdateIcon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: 'none' }}
                                />
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
