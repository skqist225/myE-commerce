import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Flex } from '../../globalStyle';
import { createImage } from '../../helpers';
import {
    MenuDetail,
    DetailFunc,
    MenuTitle,
    MenuIcon,
    FlexAlignStart,
    LeftMenu,
    Username,
    RightInfo,
    Label,
    UserInfo,
    RadioLabel,
    RadioInput,
    BirthdaySelect,
    UpdateInfoButton,
    UpdateForm,
    InfoHeader,
    TextInput,
    UpdateImage,
    InfoSection,
} from './UserComponent';
import { EditIcon } from '../shopList/svgIcon';

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

    function hideSubMenu() {
        const menuDetails = document.getElementsByClassName('menuDetail');
        for (let menuDetail of menuDetails) {
            menuDetail.style.display = 'none';
        }
    }

    function turnOnSubMenu(flag) {
        const menuDetails = document.getElementsByClassName('menuDetail');
        menuDetails[flag === 0 ? 0 : 1].style.display = 'block';
        menuDetails[flag === 0 ? 1 : 0].style.display = 'none';
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
        <>
            <Flex alignItems="flex-start">
                <LeftMenu>
                    <Flex padding="1.5rem 0">
                        <img
                            alt=""
                            src={createImage(user.avatar, false)}
                            style={{ width: '4.75rem', height: '4.75rem', borderRadius: '50%' }}
                        />
                        <Flex
                            className="username"
                            flexDirection="column"
                            alignItems="flex-start"
                            style={{ paddingLeft: '1.5rem' }}
                        >
                            <Username>{user.username}</Username>
                            <div style={{ fontSize: '1.8rem' }}>
                                <EditIcon />
                                Sửa hồ sơ
                            </div>
                        </Flex>
                    </Flex>
                    <Flex flexDirection="column" width="18rem">
                        <FlexAlignStart>
                            <MenuIcon src={createImage('TKCT.png')} alt="" />
                            <Flex flexDirection="column">
                                <MenuTitle onClick={() => turnOnSubMenu(0)}>
                                    Tài Khoản Của Tôi
                                </MenuTitle>
                                <MenuDetail>
                                    <DetailFunc>
                                        <Link to="/user/account/profile">Hồ Sơ </Link>
                                    </DetailFunc>
                                    <DetailFunc>Ngân Hàng</DetailFunc>
                                    <DetailFunc>Địa chỉ</DetailFunc>
                                    <DetailFunc>Đổi mật khẩu</DetailFunc>
                                </MenuDetail>
                            </Flex>
                        </FlexAlignStart>
                        <FlexAlignStart>
                            <MenuIcon src={createImage('DM.png')} alt="" />
                            <MenuTitle onClick={() => hideSubMenu()}>Đơn Mua</MenuTitle>
                        </FlexAlignStart>
                        <FlexAlignStart>
                            <MenuIcon src={createImage('TB.png')} alt="" />

                            <Flex flexDirection="column" alignItems="flex-start">
                                <MenuTitle onClick={() => turnOnSubMenu(1)}>Thông Báo</MenuTitle>
                                <MenuDetail>
                                    <DetailFunc>Cập Nhật Đơn Hàng</DetailFunc>
                                    <DetailFunc>Khuyến Mãi</DetailFunc>
                                    <DetailFunc>Cập Nhật Ví</DetailFunc>
                                    <DetailFunc>Cập Nhật Đánh Giá</DetailFunc>
                                    <DetailFunc>Cập Nhật Shopee</DetailFunc>
                                </MenuDetail>
                            </Flex>
                        </FlexAlignStart>
                        <FlexAlignStart>
                            <MenuIcon src={createImage('KV.png')} alt="" />
                            <MenuTitle onClick={() => hideSubMenu()}>Kho Voucher</MenuTitle>
                        </FlexAlignStart>
                        <FlexAlignStart>
                            <MenuIcon src={createImage('SX.png')} alt="" />
                            <MenuTitle onClick={() => hideSubMenu()}>Shopee Xu</MenuTitle>
                        </FlexAlignStart>
                    </Flex>
                </LeftMenu>
                <RightInfo>
                    <InfoHeader>
                        <div>Hồ Sơ Của Tôi</div>
                        <div className="lineTwo">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                    </InfoHeader>
                    <Flex style={{ paddingTop: '3.75rem' }} alignItems="flex-start">
                        <InfoSection>
                            <UpdateForm
                                onSubmit={handleSubmit(onSubmit)}
                                encType="multipart/form-data"
                            >
                                <Flex>
                                    <Label>Tên Đăng Nhập</Label>
                                    <UserInfo>{user.username}</UserInfo>
                                </Flex>
                                <Flex>
                                    <Label>Tên</Label>
                                    <TextInput
                                        type="text"
                                        defaultValue={`${user.firstName} ${user.lastName}`}
                                    />
                                </Flex>
                                <Flex>
                                    <Label htmlFor="">Email</Label>
                                    <UserInfo>{hiddenEmail}</UserInfo>
                                    {/* <TextInput type="text"  */}
                                </Flex>
                                <Flex>
                                    <Label htmlFor="">Số Điện Thoại</Label>
                                    <UserInfo>{hiddenPhoneNumber}</UserInfo>

                                    {/* <TextInput type="text"  */}
                                </Flex>
                                <Flex>
                                    <Label htmlFor="">Tên Shop</Label>
                                    <TextInput type="text" className="userInfoInput" />
                                </Flex>
                                <Flex>
                                    <Label htmlFor="userGender">Giới Tính</Label>
                                    <Flex justifyContent="space-evenly" width="50%">
                                        <Flex>
                                            <RadioInput {...register('gender')} value="male" />
                                            <RadioLabel>Nam</RadioLabel>
                                        </Flex>
                                        <Flex>
                                            <RadioInput {...register('gender')} value="female" />
                                            <RadioLabel>Nữ</RadioLabel>
                                        </Flex>
                                        <Flex>
                                            <RadioInput {...register('gender')} value="other" />
                                            <RadioLabel>Khác</RadioLabel>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex>
                                    <Label htmlFor="userBirthday">Ngày Sinh</Label>
                                    <Flex width="80%" justifyContent="space-between">
                                        <BirthdaySelect {...register('date')}>
                                            {Array.apply(null, { length: 31 }).map((_, index) => (
                                                <option value={index + 1} key={index}>
                                                    {index + 1}
                                                </option>
                                            ))}
                                        </BirthdaySelect>
                                        <BirthdaySelect {...register('month')}>
                                            {Array.apply(undefined, { length: 12 }).map(
                                                (_, index) => (
                                                    <option value={index + 1} key={index}>
                                                        Tháng {index + 1}
                                                    </option>
                                                )
                                            )}
                                        </BirthdaySelect>
                                        <BirthdaySelect {...register('year')}>
                                            {Array.from({ length: 122 }).map((_, index) => {
                                                return (
                                                    <option value={2021 - index} key={index}>
                                                        {2021 - index}
                                                    </option>
                                                );
                                            })}
                                        </BirthdaySelect>
                                    </Flex>
                                </Flex>
                                <UpdateInfoButton type="submit">Lưu</UpdateInfoButton>
                            </UpdateForm>
                        </InfoSection>
                        <UpdateImage>
                            <img
                                src={createImage(user.avatar, false)}
                                style={{
                                    width: '15rem',
                                    height: '15rem',
                                    borderRadius: '50%',
                                }}
                            />
                            <div className="lineOne">
                                <input type="text" type="file" />
                            </div>
                            <div
                                style={{
                                    color: '#999',
                                    fontSize: '1.75rem',
                                    lineHeight: '2.5rem',
                                }}
                            >
                                Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG
                            </div>
                        </UpdateImage>
                    </Flex>
                </RightInfo>
            </Flex>
        </>
    );
}

export default User;
