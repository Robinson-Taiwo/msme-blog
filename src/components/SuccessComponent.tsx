import React from 'react';
import { Button } from './ui/button';

const SuccessComponent = () => {
    return (
        <div className="flex flex-col items-center justify-center w-[747px] h-[461px] pt-[7.19rem] pb-[6.25rem] max-md:min-h-screen max-md:w-full max-md:h-auto max-sm:pt-8 max-sm:pb-8 max-sm:px-4 sm:pt-12 sm:pb-12 sm:px-6">
            <div className="flex flex-col items-center justify-center gap-[0.92rem] max-sm:gap-4 max-sm:w-full max-sm:max-w-[90%] sm:gap-6 sm:max-w-[600px]">
                <h1 className="text-black text-[42px] font-semibold max-sm:text-3xl sm:text-4xl">
                    Success
                </h1>
                <p className="text-6 text-secondary font-medium max-sm:text-sm max-sm:text-center sm:text-base sm:text-center">
                    Your account is verified successfully
                </p>
            </div>

            <Button className="bg-primary w-[468px] h-[3.9rem] mt-[5.52rem] text-white rounded-[9.04px] text-xl max-sm:w-full max-sm:max-w-[90%] max-sm:h-12 max-sm:mt-8 max-sm:text-base sm:w-[400px] sm:h-[3.5rem] sm:mt-10 sm:text-lg">
                Log in
            </Button>
        </div>
    );
};

export default SuccessComponent;