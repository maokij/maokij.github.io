---
title: 使用方法
latest_zip_url: https://github.com/maokij/ocala/releases/download/v0.0.9/ocala_Windows_x86_64.zip
latest_tgz_url: https://github.com/maokij/ocala/releases/download/v0.0.9/ocala_Linux_x86_64.tar.gz
latest_zip_name: ocala_Windows_x86_64.zip
latest_tgz_name: ocala_Linux_x86_64.tar.gz
---

## インストール方法

### Windows

<div class="hint">
    WSL で Linux 版を利用することをおすすめします。
</div>

```
PS> curl.exe -OL {{ page.latest_zip_url }}
PS> tar.exe xvf {{ page.latest_zip_name }}
PS> .\ocala\bin\ocala.exe -V
```

1. [最新版]({{ page.latest_zip_url }})をダウンロードします
2. インストールしたいフォルダにアーカイブを展開します
3. 展開された実行ファイルでバージョン情報が表示されることを確認します
   ```
   PS> .\ocala\bin\ocala.exe -V
   ```
4. 環境変数 PATH に展開された ocala/bin をフルパスで追加します

### Linux

```
$ curl -OL {{ page.latest_tgz_url }}
$ tar xvf {{ page.latest_tgz_name }}
$ ./ocala/bin/ocala -V
```

1. [最新版]({{ page.latest_tgz_url }})をダウンロードします
2. インストールしたいフォルダにアーカイブを展開します
3. 展開された実行ファイルでバージョン情報が表示されることを確認します
   ```
   $ ./ocala/bin/ocala -V
   ```
4. 環境変数 PATH に展開された ocala/bin をフルパスで追加するか、
   PATH に含まれるディレクトリに ocala/bin/ocala のシンボリックを作成します
   ```
   $ ln -nfs "$(realpath ./ocala/bin/ocala)" ~/.local/bin/ocala
   ```

## コマンドラインオプション

```
Usage: ocala [options] file
Options:
  -D value
        Define the symbol
  -I value
        Add the directory to the include path
  -L string
        Specify the list file name
  -V    Display the version information
  -l    Generate a list file
  -o string
        Specify the output file name
  -t string
        Specify the target arch
```
