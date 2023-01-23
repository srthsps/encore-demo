import { FiMail } from 'react-icons/fi';

//internal  import
import Error from '@component/form/Error';
import useLoginSubmit from '@hooks/useLoginSubmit';
import InputArea from '@component/form/InputArea';

const VerifyEmail = ({ setModalOpen, setShowVerifyOtp }) => {
    const { handleSubmit, submitHandler, register, errors, loading } =
        useLoginSubmit(setModalOpen, setShowVerifyOtp);

    return (
        <>
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold font-serif">Verify Email</h2>
                <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
                    Verify your email
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
                            label="Email"
                            name="verifyEmail"
                            type="email"
                            placeholder="Email"
                            Icon={FiMail}
                        />
                        <Error errorName={errors.registerEmail} />
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

export default VerifyEmail;
