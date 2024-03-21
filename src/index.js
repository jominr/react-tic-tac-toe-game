// 是App.js文件中创建的组件与Web浏览器之间的桥梁。
// react
import React, { StrictMode } from "react";
// react与网络浏览器对话的库（React Dom）
import { createRoot } from "react-dom/client";
// 组件样式
import "./styles.css";
// app.js中创建的组件。
import App from "./App";

// 将最终产品注入public文件夹中的index.html. 
/**
  从一开始调用了 createRoot 就在 div#root 初始化绑定了所有的监听事件，多达81个
  而不是在组件上写上对应的事件才绑定监听事件。
  对于支持捕获和冒泡阶段的事件，都会绑定两个阶段的事件，捕获事件就是在普通事件名后加上Capture后缀
*/
const root = createRoot(document.getElementById("root"));
// render(<App />)
// 里面涉及jsx的处理、hook的实现、时间片、beginWork、diff、completeWork、commit、调度机制、各种优先级、合成事件等等
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);