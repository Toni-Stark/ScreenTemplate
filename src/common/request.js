// const baseUrl = ;
const baseUrl = __DEV__
  ? 'http://cmsscreen.yyjun.pctop.cc'
  : 'http://a.ce.360zhishu.cn';
// 公安
export const baseViewUrl = `${baseUrl}/screen/city/index/440111`;
// 公信
// export const baseViewUrl = `${baseUrl}/screen/stat/index/440111`;

export const FetchApi = async ({path, method = 'POST', data}) => {
  const url = baseUrl + path;
  const requestOption = {
    method: method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
  return fetch(url, requestOption).then((res) => {
    return res.json();
  });
};
