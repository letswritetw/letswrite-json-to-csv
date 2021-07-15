document.addEventListener('DOMContentLoaded', () => {

  // 整理資料
  const buildData = data => {

    return new Promise((resolve, reject) => {

      // 最後所有的資料會存在這
      let arrayData = [];

      try {
        // 取 data 的第一個 Object 的 key 當表頭
        let arrayTitle = Object.keys(data[0]);
        arrayData.push(arrayTitle);

        // 取出每一個 Object 裡的 value，push 進新的 Array 裡
        Array.prototype.forEach.call(data, d => {
          let items = [];
          Array.prototype.forEach.call(arrayTitle, title => {
            let item = d[title] || '無';
            items.push(item);
          });
          arrayData.push(items)
        });
      } catch(err) {
        reject(err)
      }

      resolve(arrayData);
    })

  }

  // 轉成 CSV 並下載
  const downloadCSV = data => {
    let csvContent = '';
    Array.prototype.forEach.call(data, d => {
      let dataString = d.join(',') + '\n';
      csvContent += dataString;
    })

    // 下載的檔案名稱
    let fileName = '下載資料_' + (new Date()).getTime() + '.csv';

    // 建立一個 a，並點擊它
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent));
    link.setAttribute('download', fileName);
    link.click();
  }

  // 點擊按鈕時下載
  const btn = document.getElementById('download');
  btn.addEventListener('click', () => {
    try {
      let data = JSON.parse(document.getElementById('textarea').value);
      buildData(data)
        .then(data => downloadCSV(data))
        .catch(err => window.alert(err));
    } catch(err) {
      window.alert(err)
    } 
  })

})