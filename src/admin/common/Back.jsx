import {ChevronLeft} from "lucide-react";
import React from "react";

const Back = () => {
    return(
            <div className="flex p-4 px-0">
                <ChevronLeft className="w-6 h-6 text-blue-500 mr-1" />
                <h1 className="text-lg font-medium text-blue-500 ">목록으로 돌아가기</h1>
            </div>
    )
}
export default Back;