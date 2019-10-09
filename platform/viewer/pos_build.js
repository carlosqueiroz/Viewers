const fs = require("fs");
const cheerio = require("cheerio");

// TODO: TESTAR ISSO !!
const files = [
  { from: "./dist/index.html", to: "./dist/index.blade.php" },
  {
    from: "./dist/silent-refresh.html",
    to: "./dist/silent-refresh.blade.php"
  }
];
const links2replace = {
  'https://cdnjs.cloudflare.com/ajax/libs/dygraph/2.1.0/dygraph.min.css': "{{ asset('assets/dygraph/dygraph.min.css') }}",
  'https://cdnjs.cloudflare.com/ajax/libs/dygraph/2.1.0/dygraph.min.js': "{{ asset('assets/dygraph/dygraph.min.js') }}",
  'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css': "{{ asset('assets/font-awesome/font-awesome.min.css') }}",
};
const saveOriginal = true;

function readWriteSync(from, to) {
  const data = fs.readFileSync(from, "utf-8");
  const $ = cheerio.load(data);
  const start = "{{ asset('assets/viewer";
  const end = "') }}";

  $("script[src], link[href]").each(function(i, el) {
    const elem = $(this);
    let base = "";
    let attr = "";

    if (elem.is("script")) attr = "src";
    else attr = "href";
    base = elem.attr(attr);
    if(base) {
      if (!base.match(/^https?:\/\/.*/i)) {
        if (!base.startsWith("/")) base = "/" + base;
        elem.attr(attr, start + base + end);
      } else if(links2replace[base]) {
        elem.attr(attr, links2replace[base]);
      }
    }
    // console.log(el.type, el.name, attr, elem.attr(attr));
  });

  //https://github.com/cheeriojs/cheerio/issues/711
  const newValue = $.html({ decodeEntities: false });

  if (saveOriginal) {
    // Salva direto no `to`, mantendo o `from`
    fs.writeFileSync(to, newValue, "utf-8");
  } else {
    // Salva no `from` e renomeia ele para `to`
    fs.writeFileSync(from, newValue, "utf-8");
    fs.renameSync(from, to);
  }
  console.log(from, to, "Complete!");
}

files.forEach(function(v) {
  try {
    readWriteSync(v.from, v.to);
  } catch (err) {
    console.error(err);
  }
});
