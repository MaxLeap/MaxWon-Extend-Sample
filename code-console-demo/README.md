# 静态网站

静态网站是指不包含 php,perl,python,java 等动态服务器脚本的只含有html 文件，png 图片的网站。

1. 准备一个目录，**目录名称必须为html**，把所有的网站文件拷贝到目录 html 下面。
2. 用 zip 工具打包, **包名必须是 html.zip**。
    ```shell
    zip -r html.zip html
    ```
3. 准备自己的 nginx config 文件，调整相应设置。你也可以不修改提供的 nginx conf 文件，本模板是一个可以直接使用的，使用默认目录的 nginx 配置。注意如果要修改 nginx conf 文件，则模板里面系统注释部分不要更改，否则容器不能启动。

