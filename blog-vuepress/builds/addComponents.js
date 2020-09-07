const fs = require("fs");
const findMarkdown = require("./findMarkdown");
const rootDir = "./docs";

findMarkdown(rootDir, writeComponents);

function writeComponents(dir) {
    if (!/README/.test(dir)) {
        fs.appendFile(dir, `\n \n <comment/> \n `, err => {
            if (err) throw err;
            console.log(`add components to ${dir}`);
        });
        /* fs.readFile(dir, "utf8", function(err, data) {
            if (!err) {
                //读取的内容
                console.log('读取的内容', data)
                if (!data.includes('文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下')) {
                    fs.appendFile(dir, `\n ## 最后

                        文中若有不准确或错误的地方，欢迎指出，有兴趣可以的关注下[Github](https://github.com/GolderBrother)~ \n `, err => {
                        if (err) throw err;
                        console.log(`add components to ${dir}`);
                    });
                }
            }
        }); */
    }
}