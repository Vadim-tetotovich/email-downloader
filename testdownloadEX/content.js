// (async () => {
//   const delay = (ms) => new Promise((r) => setTimeout(r, ms));

//   const sleep = async (ms = 1000) => await delay(ms);

//   async function clickElement(el) {
//     el.scrollIntoView({ behavior: "smooth", block: "center" });
//     await sleep(500);
//     el.click();
//     await sleep(1000);
//   }

//   async function downloadAllReadEmails() {
//     let emails = document.querySelectorAll('tr.zA.yO'); // прочитанные

//     let session_IK = window.GLOBALS?.[9]
//     let permmsgid

//     for (let i = 0; i < emails.length; i++) {
//       let email = emails[i];

//       try {
//         await clickElement(email);

//         await sleep(1500);

//         const el = document.querySelector('[data-permmsgid], [data-message-id], [data-msgid]');
//          if (el) {
//           permmsgid = (el.getAttribute('data-permmsgid') ||
//                        el.getAttribute('data-message-id') ||
//                        el.getAttribute('data-msgid'))?.replace('#', '');
//           console.log('permmsgid:', permmsgid);
//         } else {
//           console.log('Элемент с permmsgid не найден');
//           continue;
//         }

//         await sleep(500);

//         const link = `https://mail.google.com/mail/u/0?ik=${session_IK}&view=att&permmsgid=${permmsgid}&disp=comp&safe=1`;
//         window.open(link, '_blank');

//         await sleep(2000); // подождать завершения загрузки

//         window.history.back();
//         await sleep(2000); // подождать загрузку списка

//         emails = document.querySelectorAll('tr.zA.yO'); // обновить список
//       } catch (err) {
//         console.error("Ошибка при обработке письма:", err);
//       }
//     }

//     console.log("Готово");
//   }

//   downloadAllReadEmails();
// })();

// (async () => {
//   const delay = (ms) => new Promise((r) => setTimeout(r, ms));
//   const sleep = async (ms = 1000) => await delay(ms);

//     async function simulateClick(element) {
//   element.scrollIntoView({ behavior: "smooth", block: "center" });

//   const eventProps = {
//     bubbles: true,
//     cancelable: true,
//     view: window,
//   };

//   element.dispatchEvent(new MouseEvent("mouseover", eventProps));
//   await new Promise(r => setTimeout(r, 50));
//   element.dispatchEvent(new MouseEvent("mousedown", eventProps));
//   await new Promise(r => setTimeout(r, 50));
//   element.dispatchEvent(new MouseEvent("mouseup", eventProps));
//   await new Promise(r => setTimeout(r, 50));
//   element.dispatchEvent(new MouseEvent("click", eventProps));
// }


//   async function clickElement(el) {
//     el.scrollIntoView({ behavior: "smooth", block: "center" });
//     await sleep(500);
//     el.click();
//     await sleep(1000);
//   }

//   async function downloadEmailsOnPage() {
//     let emails = document.querySelectorAll('tr.zA.yO');
//     let session_IK = window.GLOBALS?.[9];
//     let permmsgid;

//     const accountIndex = location.pathname.match(/\/u\/(\d+)/)?.[1];
//     console.log("Индекс аккаунта:", accountIndex); // например: "1"


//     for (let i = 0; i < emails.length; i++) {
//       let email = emails[i];

//       try {
//         await clickElement(email);
//         await sleep(1500);

//         const el = document.querySelector('[data-permmsgid], [data-message-id], [data-msgid]');
//         if (el) {
//           permmsgid = (el.getAttribute('data-permmsgid') ||
//                        el.getAttribute('data-message-id') ||
//                        el.getAttribute('data-msgid'))?.replace('#', '');
//           console.log('permmsgid:', permmsgid);
//         } else {
//           console.log('Элемент с permmsgid не найден');
//           continue;
//         }

//         const link = `https://mail.google.com/mail/u/${accountIndex}?ik=${session_IK}&view=att&permmsgid=${permmsgid}&disp=comp&safe=1`;
//         window.open(link, '_blank');

//         await sleep(2000); // подождать скачивания
//         window.history.back();
//         await sleep(3000);

//         emails = document.querySelectorAll('tr.zA.yO'); // обновить список
//       } catch (err) {
//         console.error("Ошибка при обработке письма:", err);
//       }
//     }
//   }

//   async function goThroughAllPages() {
//     while (true) {
//       await downloadEmailsOnPage();

//       // Попытка найти и нажать на кнопку "Следующая страница"
//      const nextBtn = document.querySelector('div[aria-label="След."]');

// if (!nextBtn) {
//   console.warn("Кнопка 'Следующая страница' не найдена");
//   break;
// }

// const disabled = nextBtn.getAttribute('aria-disabled');
// if (disabled === 'true') {
//   console.log("Последняя страница достигнута.");
//   break;
// }

// console.log("➡ Переход на следующую страницу...");
// await simulateClick(nextBtn);
// await sleep(4000);

//     }
//   }

//   await goThroughAllPages();
// })();

(async () => {
  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  const sleep = async (ms = 1000) => await delay(ms);

  let oldArray = []

  const accountIndex = location.pathname.match(/\/u\/(\d+)/)?.[1]

  async function simulateClick(element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });

    const eventProps = {
      bubbles: true,
      cancelable: true,
      view: window,
    };

    element.dispatchEvent(new MouseEvent("mouseover", eventProps));
    await sleep(50);
    element.dispatchEvent(new MouseEvent("mousedown", eventProps));
    await sleep(50);
    element.dispatchEvent(new MouseEvent("mouseup", eventProps));
    await sleep(50);
    element.dispatchEvent(new MouseEvent("click", eventProps));
  }

  async function clickElement(el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    await sleep(500);
    el.click();
    await sleep(1000);
  }

  async function downloadEmailsOnPage(pageNumber) {
  let session_IK = window.GLOBALS?.[9];
  let permmsgid;

  const emails = Array.from(document.querySelectorAll('tr.zA.yO'));
  const newArray = emails.filter(el => !oldArray.includes(el))
  oldArray = emails
  console.log('Страница: ', pageNumber)
  console.log('На странице прочитанных писем: ', newArray.length)

  for (let i = 0; i < newArray.length; i++) {
    const email = newArray[i];
    //  console.log(email, ' - ', i)

    try {
      await clickElement(email);
      await sleep(1500);

      const el = document.querySelector('[data-permmsgid], [data-message-id], [data-msgid]');
      if (el) {
        permmsgid = (el.getAttribute('data-permmsgid') ||
                     el.getAttribute('data-message-id') ||
                     el.getAttribute('data-msgid'))?.replace('#', '');
        // console.log('permmsgid:', permmsgid);
      } else {
        console.log('❌ permmsgid не найден');
        continue;
      }

      const link = `https://mail.google.com/mail/u/${accountIndex}?ik=${session_IK}&view=att&permmsgid=${permmsgid}&disp=comp&safe=1`;
      window.open(link, '_blank');

      await sleep(1500);

      console.log('Скачано писем ', i + 1, 'из', newArray.length)

      window.history.back();
      await sleep(2500);
    } catch (err) {
      console.error("Ошибка при обработке письма:", err);
    }
  }
}

  async function goThroughAllPages() {
    let page = 0;
    while (true) {
      page += 1
      await downloadEmailsOnPage(page);

      const nextBtnsArray = Array.from(document.querySelectorAll('div[aria-label="След."]'));
      const nextBtn = nextBtnsArray.at(-1)

      if (!nextBtn) {
        console.warn("Кнопка 'Следующая страница' не найдена");
        break;
      }

      const disabled = nextBtn.getAttribute('aria-disabled');
      if (disabled === 'true') {
        console.log("📨 Последняя страница достигнута.");
        break;
      }

      console.log("➡ Переход на следующую страницу...");
      await simulateClick(nextBtn);
      console.log("⏳ Ждём загрузку новой страницы...");
      await sleep(3000);
    }
  }

  await goThroughAllPages();
})();


//https://mail.google.com/mail/u/0?ik=44ac1db010&view=att&permmsgid=msg-f%3A1817303443862158844&disp=comp&safe=1

