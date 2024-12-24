// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import SplashBar from '../components/bar/SplashBar';
// import { Controller, useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import FieldSelectPlaceholder from '../components/dropdown/FieldDropdown';
// import Checkbox from '@mui/material/Checkbox';
// import { SignUpHandler } from '../components/api/SignUpApi';
// import SingleSelectPlaceholder from '../components/dropdown/JobDropdown';
// import { useNavigate } from 'react-router-dom';
// import { axiosInstance } from '../components/api/axios-instance';

// function MyPage() {
//   const [checked, setChecked] = React.useState(false);
//   const [isOtherSelected, setIsOtherSelected] = useState(false);
//   const [isFieldOther, setIsFieldOther] = useState(false);
//   const [customOccupation, setCustomOccupation] = useState('');
//   const [customField, setCustomField] = useState('');
//   const navigate = useNavigate();
//   const [isClicked, setIsClicked] = useState(false);
//   const [originalMyData, setOriginalMyData] = useState({});

//   const getDetail = async () => {
//     try {
//       const response = await axiosInstance.get('api/v1/member');
//       const result = response.data.results[0];
//       console.log('수정 전 개인정보: ', result);
//       setOriginalMyData(result);
//       reset(result);
//       if (response.status === 200) {
//         console.log('개인정보 조회 성공');
//       } else {
//         console.error('개인정보 조회 실패');
//       }
//     } catch (error) {
//       console.error('에러 발생:', error);
//     }
//   };

//   useEffect(() => {
//     getDetail();
//   }, []);

//   const handleClick = () => {
//     if (!isClicked) {
//       setIsClicked(true);
//     }
//   };
//   const handleChange1 = (event) => {
//     setChecked(event.target.checked);
//   };

//   const schema = yup.object().shape({
//     nickname: yup
//       .string()
//       .matches(
//         /^[가-힣a-zA-Z0-9\s]{1,10}$/,
//         '닉네임은 공백 포함 10자 이내로 가능합니다.',
//       )
//       .required('닉네임은 필수 항목입니다.'),
//     birthday: yup
//       .string()
//       .matches(/^\d{4}-\d{2}-\d{2}$/, '생년원일은 필수 항목입니다.')
//       .required('생년원일은 필수 항목입니다.'),
//     gender: yup.string().required('성별은 필수 항목입니다.'),
//     occupation: yup.string(),
//     field: yup.string(),
//     consentToMarketingAndAds: yup.boolean(),
//   });

//   const {
//     reset,
//     register,
//     handleSubmit,
//     control,
//     watch,
//     setValue,
//     trigger,
//     formState: { isValid, errors, touchedFields },
//   } = useForm({
//     resolver: yupResolver(schema),
//     mode: 'onChange',
//     defaultValues: {
//       originalMyData,
//     },
//   });

//   useEffect(() => {
//     setValue('consentToTermsOfService', checked[0]);
//     setValue('consentToPersonalInformation', checked[1]);
//     setValue('consentToMarketingAndAds', checked[2]);
//     if (isClicked) {
//       trigger();
//     } // 유효성 검사 강제 트리거
//   }, [checked, setValue, trigger, isClicked]);

//   const onSubmit = async (data) => {
//     const formData = {
//       ...data,
//     };
//     console.log('폼 데이터 제출:', formData);

//     try {
//       const result = await SignUpHandler(formData); // API 호출
//       if (result?.data?.status?.code === 200) {
//         alert('회원가입 성공: ' + result.data.status.message);
//         navigate('/main'); // 성공 시 페이지 이동
//       }
//     } catch (error) {
//       // 에러 발생 시 에러 메시지를 경고창으로 표시
//       alert(
//         `회원가입 실패: ${error.message || '알 수 없는 오류가 발생했습니다.'}`,
//       );
//     }
//   };

//   const formValues = watch();
//   useEffect(() => {
//     console.log('현재 폼 값:', formValues);
//   }, [formValues]);

//   return (
//     <div>
//       <form noValidate onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           <SplashBar />
//           <Page>
//             <Header>
//               <Titles>마이페이지</Titles>
//               <Short>개인 정보 수정</Short>

//               <Line />
//             </Header>
//             <Signup>
//               <Option>
//                 <Name>닉네임 *</Name>
//                 <Inputs
//                   type={'text'}
//                   {...register('nickname')}
//                   placeholder="닉네임을 입력하세요."
//                   onClick={handleClick}
//                 />
//                 {errors.nickname && touchedFields.nickname && (
//                   <Error>{errors.nickname?.message}</Error>
//                 )}
//               </Option>
//               <Option>
//                 <Name>생년원일 *</Name>
//                 <Date
//                   onClick={handleClick}
//                   type="date"
//                   {...register('birthday')}
//                 />
//                 {errors.birthday && touchedFields.birthday && (
//                   <Error>{errors.birthday?.message}</Error>
//                 )}
//               </Option>
//               <Option>
//                 <Name>성별 *</Name>

//                 <Controller
//                   onClick={handleClick}
//                   name="gender"
//                   control={control}
//                   defaultValue={''}
//                   render={({ field, fieldState }) => (
//                     <Gender>
//                       <GenderChoice
//                         label="MALE"
//                         value={field.value}
//                         $isSelected={field.value === 'MALE'}
//                         onClick={() => field.onChange('MALE')}
//                         $error={fieldState.error ? true : undefined}
//                         $helperText={
//                           fieldState.error && fieldState.error.message
//                         }
//                       >
//                         남자
//                       </GenderChoice>
//                       <GenderChoice
//                         label="FEMALE"
//                         value={field.value}
//                         $isSelected={field.value === 'FEMALE'}
//                         onClick={() => field.onChange('FEMALE')}
//                         $error={fieldState.error ? true : undefined}
//                         $helperText={
//                           fieldState.error && fieldState.error.message
//                         }
//                       >
//                         여자
//                       </GenderChoice>
//                     </Gender>
//                   )}
//                 />
//                 {errors.gender && touchedFields.gender && (
//                   <Error>{errors.gender?.message}</Error>
//                 )}
//               </Option>
//               <Option>
//                 <Name>직업</Name>
//                 <Choice>
//                   <Controller
//                     name="occupation"
//                     control={control}
//                     defaultValue={''}
//                     render={({ field, fieldState }) => (
//                       <SingleSelectPlaceholder
//                         label="occupation"
//                         $error={fieldState.error ? true : undefined}
//                         $helperText={
//                           fieldState.error && fieldState.error.message
//                         }
//                         value={isOtherSelected ? '' : field.value}
//                         onChange={(value) => {
//                           if (value === '기타(직접 입력)') {
//                             field.onChange('');
//                             setIsOtherSelected(true);
//                           } else {
//                             field.onChange(value);
//                             setIsOtherSelected(false);
//                           }
//                         }}
//                       />
//                     )}
//                   />
//                   {isOtherSelected && (
//                     <Input
//                       placeholder="직접 입력"
//                       type="text"
//                       value={customOccupation}
//                       onChange={(e) => setCustomOccupation(e.target.value)}
//                       onBlur={() => setValue('occupation', customOccupation)}
//                     />
//                   )}
//                 </Choice>
//               </Option>
//               <Option>
//                 <Name>분야</Name>
//                 <Choice>
//                   <Controller
//                     name="field"
//                     control={control}
//                     defaultValue={''}
//                     render={({ field, fieldState }) => (
//                       <FieldSelectPlaceholder
//                         label="field"
//                         $error={fieldState.error ? true : undefined}
//                         $helperText={
//                           fieldState.error && fieldState.error.message
//                         }
//                         value={isFieldOther ? '' : field.value}
//                         onChange={(value) => {
//                           if (value === '기타(직접 입력)') {
//                             field.onChange('');
//                             setIsFieldOther(true);
//                           } else {
//                             field.onChange(value);
//                             setIsFieldOther(false);
//                           }
//                         }}
//                       />
//                     )}
//                   />

//                   {isFieldOther && (
//                     <Input
//                       placeholder="직접 입력"
//                       type="text"
//                       value={customField}
//                       onChange={(e) => setCustomField(e.target.value)}
//                       onBlur={() => setValue('field', customField)}
//                     />
//                   )}
//                 </Choice>
//               </Option>
//               <Option>
//                 <Name>약관 동의</Name>
//                 <div>
//                   <NewContent>
//                     <Content>
//                       {/* accordion mui 라이브러리 이용 */}
//                       (선택) 마케팅 활용 및 광고성 정보 수신 동의 {'>'}
//                     </Content>
//                     <Checkbox
//                       style={{ transform: 'translateY(-10px)' }}
//                       checked={checked[2]}
//                       onChange={handleChange1}
//                     />
//                   </NewContent>
//                 </div>
//               </Option>
//             </Signup>
//             <Button disabled={!isValid} type="submit">
//               수정하기
//             </Button>
//           </Page>
//         </div>
//       </form>
//       <div>탈퇴하기</div>
//     </div>
//   );
// }

// const Error = styled.div`
//   color: red;
//   font-size: 18px;
//   transform: translateY(-7px);
// `;

// const Date = styled.input`
//   font-size: 18px;
//   width: 238px;
//   height: 50px;
//   border-radius: 5px;
//   border: 1px solid #9f9f9f;
// `;

// const Button = styled.button`
//   width: 625px;
//   height: 85px;
//   font-weight: 400;
//   font-size: 30px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 69px;
//   background-color: #97ff87;
//   border: 0;

//   &:disabled {
//     background-color: #d9d9d9;
//   }
// `;

// const NewContent = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const ContentCheck = styled.div`
//   margin-top: 30px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `;

// const Content = styled.div`
//   font-size: 20px;
//   font-weight: 400;
// `;

// const Lines = styled.div`
//   width: 1094px;
//   height: 0;
//   border: 1px solid #9f9f9f;
// `;

// const Contents = styled.div`
//   font-weight: 700;
//   font-size: 20px;
//   color: #000000;
//   margin-bottom: 26px;
// `;

// const Input = styled.input`
//   width: 224px;
//   height: 65px;
//   border-radius: 5px;
//   border: 1px solid #9f9f9f;
//   font-size: 25px;

//   &::placeholder {
//     font-weight: 400;
//     font-size: 20px;
//     line-height: 23.87px;
//     color: #9f9f9f;
//     transform: translateX(34px);
//   }
// `;

// const Choice = styled.div`
//   display: flex;
//   column-gap: 37px;
// `;

// const GenderChoice = styled.div`
//   width: 179px;
//   height: 58px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   border-radius: 5px;
//   border: 0;

//   background-color: ${(props) => (props.$isSelected ? '#41C3AB' : '#DCDADA')};
// `;

// const Gender = styled.div`
//   display: flex;
//   column-gap: 20px;
// `;

// const Inputs = styled.input`
//   width: 1094px;
//   height: 65px;
//   border-radius: 5px;
//   border: 1px solid #9f9f9f;
//   font-size: 25px;

//   &::placeholder {
//     font-weight: 400;
//     font-size: 20px;
//     color: #9f9f9f;
//     transform: translateX(32px);
//   }
// `;

// const Name = styled.div`
//   font-weight: 500;
//   font-size: 24px;
//   margin-bottom: 13px;
// `;

// const Option = styled.div`
//   display: flex;
//   flex-direction: column;
//   row-gap: 27px;
// `;

// const Page = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
// `;

// const Signup = styled.div`
//   display: flex;
//   flex-direction: column;
//   row-gap: 48px;
//   margin-top: 60px;
// `;

// const Line = styled.div`
//   width: 441px;
//   height: 0px;
//   border: 1px solid #9f9f9f;
// `;

// const Short = styled.div`
//   font-weight: 400;
//   font-size: 24px;
//   text-align: center;
//   color: #9f9f9f;
//   margin-top: 26px;
//   margin-bottom: 20px;
// `;

// const Header = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   margin-top: 86px;
// `;
// const Titles = styled.div`
//   font-weight: 600;
//   font-size: 50px;
//   text-align: center;
// `;

// export default MyPage;
