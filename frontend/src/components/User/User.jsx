import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { createImage } from '../../helpers';
import { Flex } from '../../globalStyle';

import {
    UserInfoSection,
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

function User() {
    const { user } = useSelector(state => state.auth);
    const { birthday, email, phoneNumber } = user;
    const date = new Date(birthday).getDate();
    const month = new Date(birthday).getMonth();
    const year = new Date(birthday).getFullYear();

    const starCharacter = [];
    const phoneCharacter = [];

    Array.apply(undefined, { length: email.substring(2, email.indexOf('@')).length }).forEach(
        (_, index) => starCharacter.push('*')
    );
    Array.from({ length: phoneNumber.substring(0, phoneNumber.length - 2).length }).forEach(
        (_, index) => phoneCharacter.push('*')
    );

    const hiddenEmail = email.replace(
        email.substring(2, email.indexOf('@')),
        starCharacter.join('')
    );

    const hiddenPhoneNumber = phoneNumber.replace(
        phoneNumber.substring(0, phoneNumber.length - 2),
        phoneCharacter.join('')
    );

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
            <UserInfoSection>
                <InfoHeader>
                    <div>Hồ Sơ Của Tôi</div>
                    <div className="lineTwo">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                </InfoHeader>
                <Flex style={{ paddingTop: '3.75rem' }} alignItems="flex-start">
                    <InfoSection>
                        <UpdateForm onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
                                        {Array.apply(undefined, { length: 12 }).map((_, index) => (
                                            <option value={index + 1} key={index}>
                                                Tháng {index + 1}
                                            </option>
                                        ))}
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
            </UserInfoSection>
        </>
    );
}

export default User;
