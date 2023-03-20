/* Для подключения module.css */
declare module "*.module.css";
/* Для покдлючения gif в Preloader */
declare module "*.gif" {
  const content: string;
  export default content;
}
