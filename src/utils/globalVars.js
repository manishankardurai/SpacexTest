export default typeof window === 'undefined' ? {} : window.GlobalEnvs;


export function is_server() {
  return !(typeof window !== 'undefined' && window.document);
}


export function isMobileWeb() {
  if (!is_server()) {
    return window.innerWidth < 490;
  }
}