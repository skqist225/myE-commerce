import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createImage } from '../../helper';
import './user.css';

function User() {
    const { user } = useSelector(state => state.auth);
    const { birthday, email, phoneNumber } = user;
    const date = new Date(birthday).getDate();
    const month = new Date(birthday).getMonth();
    const year = new Date(birthday).getFullYear();

    const numCharacter = email.substring(2, email.indexOf('@')).length;
    const numCharacter2 = phoneNumber.substring(0, phoneNumber.length - 2).length;
    const starCharacter = [];
    const phoneCharacter = [];

    Array.apply(undefined, { length: email.substring(2, email.indexOf('@')).length }).forEach(
        (_, index) => starCharacter.push('*')
    );

    Array.from({ length: numCharacter2 }).forEach((_, index) => phoneCharacter.push('*'));

    const hiddenEmail = email.replace(
        email.substring(2, email.indexOf('@')),
        starCharacter.join('')
    );

    const hiddenPhoneNumber = phoneNumber.replace(
        phoneNumber.substring(0, phoneNumber.length - 2),
        phoneCharacter.join('')
    );

    const userQMSubMenu = document.getElementsByClassName('userQMSubMenu');

    function hideSubMenu() {
        for (let subMenu of userQMSubMenu) {
            subMenu.style.display = 'none';
        }
    }

    function turnOnSubMenu(flag) {
        userQMSubMenu[flag === 0 ? 0 : 1].style.display = 'block';
        userQMSubMenu[flag === 0 ? 1 : 0].style.display = 'none';
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            gender: user.gender,
            date,
            month,
            year,
        },
    });

    const onSubmit = (data, e) => {
        console.log(data);
    };

    return (
        <div className="user">
            <div className="userInfoContainer">
                <article className="userInfoLeft">
                    <div className="usernameAndImageWrapper">
                        <img
                            alt=""
                            src={createImage(user.avatar, false)}
                            className="userInfoImagePreview"
                        />
                        <div className="username">
                            <p>{user.username}</p>
                            <p>Sửa hồ sơ</p>
                        </div>
                    </div>
                    <div className="userQuickMenu">
                        <section className="userMenuWrapper">
                            <img src={createImage('TKCT.png')} alt="" className="userIconMenu" />
                            <div>
                                <p className="userMenuParentTitle" onClick={() => turnOnSubMenu(0)}>
                                    Tài Khoản Của Tôi
                                </p>
                                <ul className="userQMSubMenu">
                                    <li>
                                        <Link to="/user/account/profile">Hồ Sơ </Link>
                                    </li>
                                    <li>Ngân Hàng</li>
                                    <li>Địa chỉ</li>
                                    <li>Đổi mật khẩu</li>
                                </ul>
                            </div>
                        </section>
                        <section className="userMenuWrapper">
                            <img src={createImage('DM.png')} alt="" className="userIconMenu" />
                            <p className="userMenuParentTitle" onClick={() => hideSubMenu()}>
                                Đơn Mua
                            </p>
                        </section>
                        <section className="userMenuWrapper">
                            <img src={createImage('TB.png')} alt="" className="userIconMenu" />

                            <div className="userSubMenuWrapper">
                                <p className="userMenuParentTitle" onClick={() => turnOnSubMenu(1)}>
                                    Thông Báo
                                </p>
                                <ul className="userQMSubMenu">
                                    <li>Cập Nhật Đơn Hàng</li>
                                    <li>Khuyến Mãi</li>
                                    <li>Cập Nhật Ví</li>
                                    <li>Cập Nhật Đánh Giá</li>
                                    <li>Cập Nhật Shopee</li>
                                </ul>
                            </div>
                        </section>
                        <section className="userMenuWrapper">
                            <img src={createImage('KV.png')} alt="" className="userIconMenu" />
                            <p className="userMenuParentTitle" onClick={() => hideSubMenu()}>
                                Kho Voucher
                            </p>
                        </section>
                        <section className="userMenuWrapper">
                            <img src={createImage('SX.png')} alt="" className="userIconMenu" />
                            <p className="userMenuParentTitle" onClick={() => hideSubMenu()}>
                                Shopee Xu
                            </p>
                        </section>
                    </div>
                </article>
                <article className="userInfoRight">
                    <section className="userInfoHeader">
                        <h2>Hồ Sơ Của Tôi</h2>
                        <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    </section>
                    <section className="userInfoSubRightContainer">
                        <div style={{ flex: 2, paddingRight: '62.5px' }}>
                            <form
                                action=""
                                className="userInfoUpdateForm"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="" className="userInfoLabel">
                                        Tên Đăng Nhập
                                    </label>
                                    <div className="userInfoDivInput">{user.username}</div>
                                </div>
                                <div>
                                    <label htmlFor="" className="userInfoLabel">
                                        Tên
                                    </label>
                                    <input
                                        type="text"
                                        className="userInfoInput"
                                        defaultValue={`${user.firstName} ${user.lastName}`}
                                    />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="" className="userInfoLabel">
                                        Email
                                    </label>
                                    <div className="userInfoDivInput">{hiddenEmail}</div>
                                    {/* <input type="text" className="userInfoInput" /> */}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="" className="userInfoLabel">
                                        Số Điện Thoại
                                    </label>
                                    <div className="userInfoDivInput">{hiddenPhoneNumber}</div>

                                    {/* <input type="text" className="userInfoInput" /> */}
                                </div>
                                <div>
                                    <label htmlFor="" className="userInfoLabel">
                                        Tên Shop
                                    </label>
                                    <input type="text" className="userInfoInput" />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="" className="userInfoLabel">
                                        Giới Tính
                                    </label>
                                    <div className="userInfoRadioSection">
                                        <div className="userInfoRadioContainer">
                                            <input
                                                {...register('gender')}
                                                type="radio"
                                                className="userInfoRadio"
                                                value="male"
                                            />
                                            <label htmlFor="" className="userInfoRadioLabel">
                                                Nam
                                            </label>
                                        </div>
                                        <div className="userInfoRadioContainer">
                                            <input
                                                {...register('gender')}
                                                type="radio"
                                                className="userInfoRadio"
                                                value="female"
                                            />
                                            <label htmlFor="" className="userInfoRadioLabel">
                                                Nữ
                                            </label>
                                        </div>
                                        <div className="userInfoRadioContainer">
                                            <input
                                                {...register('gender')}
                                                type="radio"
                                                className="userInfoRadio"
                                                value="other"
                                            />
                                            <label htmlFor="" className="userInfoRadioLabel">
                                                Khác
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <label htmlFor="" className="userInfoLabel">
                                        Ngày Sinh
                                    </label>
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: '80%',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <select {...register('date')} className="userInfoSelect">
                                            {Array.apply(null, { length: 31 }).map((_, index) => (
                                                <option value={index + 1} key={index}>
                                                    {index + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <select {...register('month')} className="userInfoSelect">
                                            {Array.apply(undefined, { length: 12 }).map(
                                                (_, index) => (
                                                    <option value={index + 1} key={index}>
                                                        Tháng {index + 1}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                        <select {...register('year')} className="userInfoSelect">
                                            {Array.from({ length: 122 }).map((_, index) => {
                                                return (
                                                    <option value={2021 - index} key={index}>
                                                        {2021 - index}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="userInfoUpdateButton">
                                    Lưu
                                </button>
                            </form>
                        </div>
                        <div className="userInfoAvatarPreviewSection">
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    flexDirection: 'column',
                                }}
                            >
                                <img
                                    src={createImage(user.avatar, false)}
                                    alt="userInfoImagePreview"
                                    className="userInfoImagePreview2"
                                />
                                <input type="text" type="file" />
                                <div className="helperText">
                                    Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </div>
        </div>
    );
}

export default User;
