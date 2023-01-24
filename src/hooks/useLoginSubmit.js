import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { GoogleLogin } from 'react-google-login';

//internal import
import UserServices from '@services/UserServices';
import { UserContext } from '@context/UserContext';
import { notifyError, notifySuccess } from '@utils/toast';

const useLoginSubmit = (setModalOpen, setShowVerifyEmail, setShowVerifyOtp) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = ({
    name,
    email,
    registerEmail,
    verifyEmail,
    verifyOtp,
    verifyOtpEmail,
    password,
  }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

    if (registerEmail && password) {
      UserServices.userLogin({
        username: registerEmail,
        password,
      })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          router.push(redirect || '/');
          notifySuccess(res.message);
          dispatch({ type: 'USER_LOGIN', payload: res });
          localStorage.setItem('portal-token', (res.data.token.access))
          console.log("info", res);
          Cookies.set('userInfo', JSON.stringify(res), {

          });

        })
        .catch((err) => {
          setLoading(false);
          notifyError(err.message);
        });
    }
    if (name && email && password) {
      UserServices.userRegister({ name, email, password }) // reg
        .then((res) => {
          setLoading(false);
          // setModalOpen(true);
          notifySuccess('Registration Success!');
          setShowVerifyEmail(true)
          router.push('/Login')

        })
        .catch((err) => {
          setLoading(false);
          notifyError(err.message);
        });
    }
    if (verifyEmail) {
      UserServices.verifyEmailAddress({ email: verifyEmail }) // verify email
        .then((res) => {
          setLoading(false);
          // setModalOpen(true);
          notifySuccess(res.message);
          setShowVerifyEmail(true)
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err);
        });
    }
    if (verifyOtp) {
      UserServices.verifyOtp({ otp: verifyOtp, email: verifyOtpEmail }) // verify otp
        .then((res) => {
          setLoading(false);
          // setModalOpen(true);
          notifySuccess(res.message);
          setShowVerifyOtp(false)
          setShowVerifyEmail(false)

        })
        .catch((err) => {
          setLoading(false);
          notifyError(err);
        });
    }


    // if (name && email && password) {
    //   UserServices.userRegister({ name, email, password }) // reg
    //     .then((res) => {
    //       setLoading(false);
    //       setModalOpen(false);
    //       notifySuccess(res.message);
    //     })
    //     .catch((err) => {
    //       setLoading(false);
    //       notifyError(err.response.message);
    //     });
    // }


    // if (verifyEmail) {
    //   UserServices.forgetPassword({ verifyEmail })
    //   .then((res) => {
    //     setLoading(false);
    //     notifySuccess(res.message);
    //     setValue('verifyEmail');
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     notifyError(err ? err.response.message : err.message);
    //   });
    // }


  };

  // const handleGoogleSignIn = (user) => {
  //   console.log('google sign in', user);
  //   if (user.profileObj.name) {
  //     UserServices.signUpWithProvider({
  //       name: user.profileObj.name,
  //       email: user.profileObj.email,
  //       image: user.profileObj.imageUrl,
  //     })
  //       .then((res) => {
  //         setModalOpen(false);
  //         notifySuccess('Login success!');
  //         router.push(redirect || '/');
  //         dispatch({ type: 'USER_LOGIN', payload: res });
  //         Cookies.set('userInfo', JSON.stringify(res), {
  //           expires: cookieTimeOut,
  //         });
  //       })

  //       .catch((err) => {
  //         notifyError(err.message);
  //         setModalOpen(false);
  //       });
  // }
  // };

  return {
    handleSubmit,
    submitHandler,
    // handleGoogleSignIn,
    register,
    errors,
    // GoogleLogin,
    loading,
  };
};

export default useLoginSubmit;
