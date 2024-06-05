export function extractLinks(text) {
  const links = [];
  const result = text.replace(/(https?:\/\/[^\s]+)/g, function (url) {
    links.push(url);
    return `{link}`;
  });

  return [result, links];
}

export function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
