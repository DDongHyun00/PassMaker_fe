import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              관리자 기능
            </h3>
            <div className="text-sm text-gray-600 mb-8 leading-relaxed max-w-[180px]">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/admin" className="hover:text-gray-900 ">
                    관리자 대시보드
                  </Link>
                </li>
                <li>
                  <Link to="/admin/payments" className="hover:text-gray-900">
                    정산 관리
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex space-x-4">
              <Facebook />
              <Twitter />
              <Instagram />
              <Linkedin />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              고객 관리
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/admin/users" className="hover:text-gray-900">
                  회원 관리
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/mentor-application"
                  className="hover:text-gray-900"
                >
                  멘토 관리
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              운영 관리
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link to="/admin/report-review" className="hover:text-gray-900">
                  신고 관리
                </Link>
              </li>
              <li>
                <Link to="/admin/inquiries" className="hover:text-gray-900">
                  1:1 문의 관리
                </Link>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              서비스 지원
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={20} />
                <p>kd3573@naver.com</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={20} />
                <p>02-337-4217</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin />
                <p>서울특별시 강남구 테헤란로 123</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              © 2023 관리자 기능 와이어프레임. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">
                개인정보처리방침
              </a>
              <a href="#" className="hover:text-gray-900">
                이용약관
              </a>
              <a href="#" className="hover:text-gray-900">
                쿠키 정책
              </a>
              <a href="#" className="hover:text-gray-900">
                사이트맵
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
