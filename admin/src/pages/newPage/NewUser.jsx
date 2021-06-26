import React from 'react';
import './newUser.css';

export default function NewUser() {
    return (
        <div className="newUser">
            <h1 className="newUserTitle">
                <form action="" className="newUserForm">
                    <div className="newUserItem">
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="newUserItem">
                        <label htmlFor="">Full name</label>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="newUserItem">
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="newUserItem">
                        <label htmlFor="">Password</label>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="newUserItem">
                        <label htmlFor="">Phone</label>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="newUserItem">
                        <label htmlFor="">Address</label>
                        <input type="text" placeholder="Username" />
                    </div>
                    <div className="newUserItem">
                        <label htmlFor="">Gender</label>
                        <div className="newUserGender">
                            <label htmlFor="Female">Male</label>
                            <input
                                type="radio"
                                name="male"
                                value="male"
                                id="male"
                            />
                            <label htmlFor="Male">Female</label>
                            <input
                                type="radio"
                                name="female"
                                value="female"
                                id="female"
                            />{' '}
                            <label htmlFor="Female">Other</label>
                            <input
                                type="radio"
                                name="other"
                                value="other"
                                id="other"
                            />
                        </div>
                    </div>
                    <div className="newUserItem">
                        {' '}
                        <label htmlFor="">Active</label>
                        <select
                            name="active"
                            id="active"
                            className="newUserSelect"
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="newUserItem">
                        <button className="newUserButton" type="submit">
                            Create
                        </button>
                    </div>
                </form>
            </h1>
        </div>
    );
}
