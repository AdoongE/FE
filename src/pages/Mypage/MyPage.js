import { yupResolver } from '@hookform/resolvers/yup';
import Checkbox from '@mui/material/Checkbox';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as yup from 'yup';
import { axiosInstance } from '../../components/api/axios-instance';
import FieldSelectPlaceholder from '../../components/dropdown/FieldDropdown';
import SingleSelectPlaceholder from '../../components/dropdown/JobDropdown';
import { Icon } from '@iconify/react';
import Navbar from '../../components/Navbar';
import ImpossibleAlert from '../../assets/icons/impossible-alert.svg';

function MyPage() {
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [isFieldOther, setIsFieldOther] = useState(false);
  const [customOccupation, setCustomOccupation] = useState('');
  const [customField, setCustomField] = useState('');
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [originalMyData, setOriginalMyData] = useState({});
  const [checked, setChecked] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const getDetail = async () => {
    try {
      const response = await axiosInstance.get('api/v1/member');
      const result = response.data.results[0];
      console.log('수정 전 개인정보: ', result);
      setOriginalMyData(result);
      setChecked(result.consentToMarketingAndAds || false);
      // reset(result);
      if (response.status === 200) {
        console.log('개인정보 조회 성공');
      } else {
        console.error('개인정보 조회 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true);
    }
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const schema = yup.object().shape({
    nickname: yup
      .string()
      .matches(/^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9\s]{1,10}$/, '*공백포함 10자 이내')
      .required('*필수 항목입니다.'),
    birthday: yup
      .string()
      .matches(/^\d{4}-\d{2}-\d{2}$/, '*필수 항목입니다.')
      .required('*필수 항목입니다.'),
    gender: yup.string(),
    occupation: yup.string(),
    field: yup.string(),
    consentToMarketingAndAds: yup.boolean(),
  });

  const {
    reset,
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    // trigger,
    formState: { isValid, errors, touchedFields },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      originalMyData,
      consentToMarketingAndAds: false,
    },
  });

  useEffect(() => {
    if (originalMyData) {
      reset({
        ...originalMyData,
        consentToMarketingAndAds: checked,
      });
    }
  }, [originalMyData, reset]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      consentToMarketingAndAds: checked,
    };

    console.log('폼 데이터 제출:', formData);

    try {
      const result = await axiosInstance.patch(`/api/v1/member`, formData);

      if (result?.data?.status?.code === 200) {
        setToastMessage('회원 정보가 수정되었습니다.');
        setShowToast(true);

        setTimeout(() => {
          setShowToast(false);
          navigate('/mypage');
        }, 1500);

        return;
      }

      setToastMessage('회원 정보 수정에 실패했습니다.');
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    } catch (error) {
      console.error(`회원정보 수정 실패: `, error);

      setToastMessage('회원 정보 수정에 실패했습니다.');
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 1500);
    }
  };

  const logOut = async () => {
    try {
      const response = await axiosInstance.delete(`/api/v1/member`);
      if (response?.data?.status?.code === 200) {
        setOpen(false);
        console.log('회원정보 삭제 성공: ' + response.data.status.message);
        navigate('/');
      } else {
        console.log('회원 탈퇴 실패');
      }
    } catch (error) {
      alert(
        `회원 탈퇴 실패: ${error.message || '알 수 없는 오류가 발생했습니다.'}`,
      );
    }
  };

  const formValues = watch();
  useEffect(() => {
    console.log('현재 폼 값:', formValues);
  }, [formValues]);

  const showModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <Navbar style={{ position: 'relative' }} />
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Page>
            <HeaderContainer>
              <Header>
                <Titles>회원 정보 수정</Titles>
                <Short>변경 사항을 저장하려면 ‘수정하기’를 클릭하세요.</Short>
                <Line />
              </Header>
            </HeaderContainer>
            <Signup>
              <Option>
                <Name>닉네임 *</Name>
                <Inputs
                  type={'text'}
                  {...register('nickname')}
                  placeholder="닉네임을 입력하세요."
                  onClick={handleClick}
                />
                {errors.nickname && touchedFields.nickname ? (
                  <Error>{errors.nickname?.message}</Error>
                ) : (
                  <Error></Error>
                )}
              </Option>
              <Option>
                <Name>생년월일 *</Name>
                <Date
                  onClick={handleClick}
                  type="date"
                  {...register('birthday')}
                />
                {errors.birthday && touchedFields.birthday ? (
                  <Error>{errors.birthday?.message}</Error>
                ) : (
                  <Error></Error>
                )}
              </Option>
              <Option>
                <Name>성별</Name>

                <Controller
                  key={'gender'}
                  name="gender"
                  control={control}
                  defaultValue={''}
                  render={({ field }) => {
                    const handleSelect = (value) => {
                      if (field.value === value) {
                        field.onChange('');
                      } else {
                        field.onChange(value);
                      }
                    };

                    return (
                      <Gender>
                        <GenderChoice
                          $isSelected={field.value === 'MALE'}
                          onClick={() => handleSelect('MALE')}
                        >
                          남자
                        </GenderChoice>

                        <GenderChoice
                          $isSelected={field.value === 'FEMALE'}
                          onClick={() => handleSelect('FEMALE')}
                        >
                          여자
                        </GenderChoice>
                      </Gender>
                    );
                  }}
                />
                {errors.gender && touchedFields.gender && (
                  <Error>{errors.gender?.message}</Error>
                )}
              </Option>
              <Option>
                <Name>직업</Name>
                <Choice>
                  <Controller
                    name="occupation"
                    control={control}
                    defaultValue={''}
                    render={({ field, fieldState }) => (
                      <SingleSelectPlaceholder
                        label="occupation"
                        $error={fieldState.error ? true : undefined}
                        $helperText={
                          fieldState.error && fieldState.error.message
                        }
                        value={isOtherSelected ? '' : field.value}
                        onChange={(value) => {
                          if (value === '기타(직접 입력)') {
                            field.onChange('');
                            setIsOtherSelected(true);
                          } else {
                            field.onChange(value);
                            setIsOtherSelected(false);
                          }
                        }}
                      />
                    )}
                  />
                  {isOtherSelected && (
                    <Input
                      placeholder="직접 입력"
                      type="text"
                      value={customOccupation}
                      onChange={(e) => setCustomOccupation(e.target.value)}
                      onBlur={() => setValue('occupation', customOccupation)}
                    />
                  )}
                </Choice>
              </Option>
              <Option>
                <Name>분야</Name>
                <Choice>
                  <Controller
                    name="field"
                    control={control}
                    defaultValue={''}
                    render={({ field, fieldState }) => (
                      <FieldSelectPlaceholder
                        label="field"
                        $error={fieldState.error ? true : undefined}
                        $helperText={
                          fieldState.error && fieldState.error.message
                        }
                        value={isFieldOther ? '' : field.value}
                        onChange={(value) => {
                          if (value === '기타(직접 입력)') {
                            field.onChange('');
                            setIsFieldOther(true);
                          } else {
                            field.onChange(value);
                            setIsFieldOther(false);
                          }
                        }}
                      />
                    )}
                  />

                  {isFieldOther && (
                    <Input
                      placeholder="직접 입력"
                      type="text"
                      value={customField}
                      onChange={(e) => setCustomField(e.target.value)}
                      onBlur={() => setValue('field', customField)}
                    />
                  )}
                </Choice>
              </Option>
              <Option>
                <Name>선택 약관 동의 여부</Name>
                <Lines />
                <div>
                  <NewContent>
                    <Checkbox
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: '20px' },
                        '&.Mui-checked': {
                          color: '#41C3AB',
                        },
                      }}
                      checked={checked}
                      onChange={handleChange}
                    />
                    <Content>
                      {/* accordion mui 라이브러리 이용 */}
                      (선택) 마케팅 활용 및 광고성 정보 수신 동의 {'>'}
                    </Content>
                  </NewContent>
                </div>
              </Option>
            </Signup>
            <Button disabled={!isValid} type="submit">
              수정하기
            </Button>
            <Out onClick={() => showModal()}>탈퇴하기</Out>
          </Page>
        </div>
      </form>
      {open && (
        <Backdrop onClick={closeModal}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <OutIcon icon="ph:warning-circle-thin" />
            <ModalTitle>정말 탈퇴하시겠습니까?</ModalTitle>
            <ModalContent>
              회원탈퇴 시 모든 정보가 삭제되며, 복구되지 않습니다.
            </ModalContent>
            <Buttons>
              <ModalButton1 onClick={closeModal}>취소</ModalButton1>
              <ModalButton2 onClick={logOut}>확인</ModalButton2>
            </Buttons>
          </Dialog>
        </Backdrop>
      )}
      {showToast && (
        <CustomToast>
          <ToastIcon>
            <img src={ImpossibleAlert} alt="Alert" />
          </ToastIcon>
          <ToastMessage>{toastMessage}</ToastMessage>
        </CustomToast>
      )}
    </div>
  );
}

const CustomToast = styled.div`
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  padding: 14px 24px;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  background: var(--gray-gray4, #f2f2f2);
  box-shadow: 0 0 4.808px 0 rgba(0, 0, 0, 0.4);
  z-index: 1000;
  animation:
    fadeIn 0.3s,
    fadeOut 0.3s 2.7s;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
  }
`;

const ToastIcon = styled.div`
  width: 40px;
  height: 40px;
`;

const ToastMessage = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const HeaderContainer = styled.div`
  width: 100%;
`;

const OutIcon = styled(Icon)`
  width: 120px;
  height: 120px;
  color: #41c3ab;
  margin-bottom: 24px;
`;

const ModalButton1 = styled.button`
  font-weight: 500;
  font-size: 20px;
  width: 110px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 0;
  color: #4f4f4f;
  background-color: #f2f2f2;
`;

const ModalButton2 = styled.button`
  font-weight: 500;
  font-size: 20px;
  width: 110px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 0;
  color: white;
  background-color: #41c3ab;
`;

const Buttons = styled.div`
  display: flex;
  column-gap: 19px;
`;

const ModalContent = styled.div`
  font-weight: 400;
  font-size: 18px;
  color: #4f4f4f;
  margin-bottom: 36px;
`;

const ModalTitle = styled.div`
  font-weight: 600;
  font-size: 32px;
  margin-bottom: 12px;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Dialog = styled.div`
  position: relative;
  width: 712px;
  height: 410px;
  border-radius: 40px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
`;

const Out = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 74px;
  font-weight: 400;
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
`;

const Lines = styled.div`
  width: 858px;
  height: 1px;
  background: var(--gray2, #9f9f9f);
  margin-bottom: 20px;
`;

const Error = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 8px;
  height: 15px;
`;

const Date = styled.input`
  font-size: 16px;
  width: 200px;
  height: 48px;
  border-radius: 3.75px;
  border: 1px solid var(--gray2, #9f9f9f);
  padding-left: 14px;
`;

const Button = styled.button`
  width: 520px;
  height: 60px;
  font-weight: 600;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 119px;
  margin-bottom: 20px;
  background-color: #41c3ab;
  border: 0;
  border-radius: 8px;
  color: white;

  &:disabled {
    background-color: #dcdada;
    color: #9f9f9f;
  }
`;

const NewContent = styled.div`
  display: flex;
  align-items: center;
`;

const Content = styled.div`
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  column-gap: 6px;
  cursor: pointer;
`;

const Input = styled.input`
  width: 168px;
  height: 48px;
  border-radius: 3.75px;
  border: 1px solid var(--gray2, #9f9f9f);
  font-size: 18px;
  padding-left: 24px;

  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    color: var(--gray2, #9f9f9f);
  }
`;

const Choice = styled.div`
  display: flex;
  column-gap: 20px;
`;

const GenderChoice = styled.div`
  width: 130px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 4px;
  border: 0;
  background-color: ${(props) => (props.$isSelected ? '#41C3AB' : '#DCDADA')};
`;

const Gender = styled.div`
  display: flex;
  column-gap: 16px;
`;

const Inputs = styled.input`
  width: 858px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid var(--gray2);
  font-size: 18px;
  padding-left: 20px;

  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    color: var(--gray2);
  }
`;

const Name = styled.div`
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 16px;
`;

const Option = styled.div`
  display: flex;
  flex-direction: column;
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 10%;
  left: 25%;
`;

const Signup = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 45px;
  margin-top: 47px;
`;

const Line = styled.div`
  width: 374px;
  height: 1px;
  background: var(--gray2, #9f9f9f);
`;

const Short = styled.div`
  font-weight: 400;
  font-size: 16px;
  text-align: center;
  color: #9f9f9f;
  margin-top: 18px;
  margin-bottom: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 72px;
`;

const Titles = styled.div`
  font-weight: 600;
  font-size: 32px;
  text-align: center;
`;

export default MyPage;
