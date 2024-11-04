import React, { useState, useEffect, useRef } from "react";
import "./navbar.css";
import { FaBell } from "react-icons/fa";

function Navbar() {
    const [activeTab, setActiveTab] = useState("");
    const [activeBarWidth, setActiveBarWidth] = useState(0);
    const [activeBarLeft, setActiveBarLeft] = useState(0);
    const navbarMenuRef = useRef(null);

    const handleTabClick = (tabName, event) => {
        setActiveTab(tabName);
        const button = event.currentTarget;
        const { offsetWidth, offsetLeft } = button;
        setActiveBarWidth(offsetWidth);
        setActiveBarLeft(offsetLeft);
    };

    useEffect(() => {
        const firstButton = navbarMenuRef.current.querySelector("button");
        if (firstButton) {
        firstButton.click();
        }
    }, []);

    return (
        <div>
        <div className="navbar">
            <div className="navbar-logo-container">
            <div className="navbar-logo-box"></div>
            <div className="navbar-logo">seedzip</div>
            </div>
            <div className="navbar-menu" ref={navbarMenuRef}>
            <button
                onClick={(e) => handleTabClick("모아보기", e)}
                className={activeTab === "모아보기" ? "active" : ""}
            >
                모아보기
            </button>
            <button
                onClick={(e) => handleTabClick("관리하기", e)}
                className={activeTab === "관리하기" ? "active" : ""}
            >
                관리하기
            </button>
            <button
                onClick={(e) => handleTabClick("탐색하기", e)}
                className={activeTab === "탐색하기" ? "active" : ""}
            >
                탐색하기
            </button>
            <div
                className="active-bar"
                style={{
                width: activeBarWidth,
                left: activeBarLeft,
                }}
            />
            </div>
            <div className="navbar-right">
            <FaBell className="navbar-icon" />
            <button className="navbar-new-content">+ 새 콘텐츠</button>
            <div className="navbar-profile"></div>
            </div>
        </div>
        <div className="sidebar">
            {/* 사이드바 내용 */}
        </div>
        </div>
    );
}

export default Navbar;