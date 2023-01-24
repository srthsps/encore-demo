import { FiMail } from 'react-icons/fi';

//internal  import
import Error from '@component/form/Error';
import useLoginSubmit from '@hooks/useLoginSubmit';
import InputArea from '@component/form/InputArea';

const VerifyOtp = ({ setModalOpen, setShowVerifyOtp,setShowVerifyEmail  }) => {
    const { handleSubmit, submitHandler, register, errors, loading } =
        useLoginSubmit(setModalOpen,setShowVerifyOtp,setShowVerifyEmail);

    return (
        <>
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold font-serif">Verify Email</h2>
                <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
                    Verify your Otp
                </p>
            </div>
            <form
                onSubmit={handleSubmit(submitHandler)}
                className="flex flex-col justify-center"
            >
                <div className="grid grid-cols-1 gap-5">
                    <div className="form-group">
                        <InputArea
                            register={register}
                            // defaultValue="vishalkunnam124@gmail.com"
                            label="Enter Your Otp"
                            name="verifyOtp"
                            type="number"
                            placeholder="Enter Your Otp"
                            Icon={FiMail}
                        />
                        <Error errorName={errors.verifyOtp} />
                    </div>

                    <div className="form-group">
                        <InputArea
                            register={register}
                            // defaultValue="vishalkunnam124@gmail.com"
                            label="Enter Your Email"
                            name="verifyOtpEmail"
                            type="email"
                            placeholder="Enter Your Email"
                            Icon={FiMail}
                        />
                        <Error errorName={errors.verifyOtp} />
                    </div>
   
                    <button
                        disabled={loading}
                        type="submit"
                        className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-600 transition-all focus:outline-none my-1"
                    >
                        Verify
                    </button>
                </div>
            </form>
        </>
    );
};

export default VerifyOtp;
