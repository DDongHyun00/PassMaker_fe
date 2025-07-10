import {ChevronLeft} from "lucide-react";
import React from "react";
import {Link} from "react-router-dom";

const Back = ({to}) => {
    return(
            <Link to={to} className="flex p-4 px-0 items-center">
                <ChevronLeft className="w-6 h-6 text-blue-500 mr-1" />
                <h1 className="text-lg font-medium text-blue-500 ">목록으로 돌아가기</h1>
            </Link>
    )
}
export default Back;