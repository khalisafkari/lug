const html = (state?: string[] | any) => {
  const todos: string[] = [];
  for (let i = 0; i < state?.length; i++) {
    todos.push(
      `<img alt="" class="lzy_img" src="https://lovehug.net/uploads/lazy_loading.gif.pagespeed.ce.l2uogikTCA.gif" data-src="${state[i]}" />`,
    );
  }
  return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>Westmanga</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <style>
                        body {
                            padding-top: 60px;
                            padding-left: 5px;
                            padding-right: 5px;
                            padding-bottom: 60px;
                            margin:0;
                            background-color: #fff;
                        }

                        img {
                            height: 100%;
                            width: 100%;
                            image-rendering: high-quality;
                        }
                    </style>
                </head>
                <body>
                    <div id="myScroll">
                        ${todos.toString().replace(/(,)/gi, '')}
                    </div>
                <script>
                    document.addEventListener("DOMContentLoaded", function() {
                        const imageObserver = new IntersectionObserver((entries, imgObserver) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting) {
                                    const lazyImage = entry.target
                                    lazyImage.src = lazyImage.dataset.src
                                    lazyImage.classList.remove("lzy_img");
                                    imgObserver.unobserve(lazyImage);
                                }
                            })
                        });
                        const arr = document.querySelectorAll('img')
                        arr.forEach((v) => {
                            imageObserver.observe(v);
                        })
                        document.body.addEventListener("click",() => {
                            window.ReactNativeWebView.postMessage("up")
                        })
                    })
                </script>
                </body>
            </html>
        `;
};

export default html;
