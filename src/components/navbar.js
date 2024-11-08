import React, { useState, useEffect, useRef } from "react";
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

// CSS styles
const styles = `
body {
margin: 0;
font-family: Arial, sans-serif;
overflow-x: hidden;
}

.main-content {
margin-left: 21.5625vw;
flex-grow: 1;
}

.navbar {
display: flex;
justify-content: space-between;
align-items: center;
height: 118px;
border-bottom: 0.0521rem solid #ffffff;
box-shadow: 0 0.125rem 0.3125rem rgba(0, 0, 0, 0.1);
position: relative;
z-index: 2;
}

.navbar-logo-container {
display: flex;
align-items: center;
}

.navbar-logo-box {
width: 1.75rem;
height: 1.625rem;
background-color: #41c3ab;
margin-left: 1.5rem;
}

.navbar-logo {
margin-left: 1.25rem;
margin-bottom: 0.75rem;
font-size: 2.5rem;
font-weight: bold;
width: 9.25rem;
height: 2.5rem;
}

.navbar-menu {
display: flex;
gap: 4vw;
margin-left: -16vw;
position: relative;
}

.navbar-menu button {
color: #666;
padding: 0.75rem 1.25rem;
font-size: 1.5vw;
background: transparent;
border: none;
cursor: pointer;
}

.navbar-menu button.active {
font-weight: bold;
color: #000;
}

.active-bar {
width: 9vw;
max-width: 155px;
height: 0.45rem;
background-color: #41c3ab;
position: absolute;
top: 85px;
left: 0;
transition: width 0.3s ease, left 0.3s ease;
z-index: 3;
}

.navbar-right {
display: flex;
align-items: center;
}

.navbar-icon {
width: 1.56vw;
height: 1.56vw;
font-size: 1.2em;
color: #333;
background-color: transparent;
cursor: pointer;
}

.navbar-new-content {
background-color: #41c3ab;
font-size: 0.92vw;
color: #fff;
width: 8.13vw;
height: 2.51vw;
border-radius: 2.52rem;
cursor: pointer;
}

.navbar-profile {
width: 2.5vw;
height: 2.5vw;
border-radius: 50%;
background-color: #ddd;
margin-right: 1rem;
}

.sidebar {
width: 21.5625vw;
height: calc(100vh - 150px);
background-color: #F8FBFB;
position: fixed;
top: 118px;
left: 0;
z-index: 1;
}
`;

// Adding styles to document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);