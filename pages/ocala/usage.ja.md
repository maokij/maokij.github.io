---
title: 使用方法
latest_zip_url: https://github.com/maokij/ocala/releases/download/v0.1.6/ocala_Windows_x86_64.zip
latest_tgz_url: https://github.com/maokij/ocala/releases/download/v0.1.6/ocala_Linux_x86_64.tar.gz
latest_zip_name: ocala_Windows_x86_64.zip
latest_tgz_name: ocala_Linux_x86_64.tar.gz
---

## インストール方法

### Windows

<div class="hint">
    WSL で Linux 版を利用することをおすすめします。
</div>

1. [最新版]({{ page.latest_zip_url }})をダウンロードします
   ```
   PS> curl.exe -OL {{ page.latest_zip_url }}
   ```
2. インストールしたいフォルダにアーカイブを展開します
   ```
   PS> tar.exe xvf {{ page.latest_zip_name }}
   ```
3. 展開された実行ファイルでバージョン情報が表示されることを確認します
   ```
   PS> .\ocala\bin\ocala.exe -V
   ```
4. 環境変数 PATH に展開された ocala/bin をフルパスで追加します

### Linux

1. [最新版]({{ page.latest_tgz_url }})をダウンロードします
   ```
   $ curl -OL {{ page.latest_tgz_url }}
   ```
2. インストールしたいフォルダにアーカイブを展開します
   ```
   $ tar xvf {{ page.latest_tgz_name }}
   ```
3. 展開された実行ファイルでバージョン情報が表示されることを確認します
   ```
   $ ./ocala/bin/ocala -V
   ```
4. 環境変数 PATH に展開された ocala/bin をフルパスで追加するか、
   PATH に含まれるディレクトリに ocala/bin/ocala のシンボリックを作成します
   ```
   $ ln -nfs "$(realpath ./ocala/bin/ocala)" ~/.local/bin/
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

## Language Server

v.0.1.5 から、リリースに ocala-language-server が含まれます。

現状、LSP の下記の機能に対応しています。

- 補完(textDocument/completion)
- シンボル一覧(textDocument/documentSymbol)
- 定義ジャンプ(textDocument/definition)

### Emacs での利用

1. ocala のアーカイブを展開します(ocala のインストール時のものを再利用できます)
   ```
   $ tar xvf {{ page.latest_tgz_name }}
   ```
2. Emacs の load-path に含まれるディレクトリに ocala-mode.el をコピーします
   ```
   $ mkdir -p ~/.config/emacs/lisp
   $ cp ./ocala/share/ocala/misc/ocala-mode.el ~/.config/emacs/lisp/
   ```
3. 環境変数 PATH に含まれるディレクトリに ocala-language-server のシンボリックを作成します
   ```
   $ ln -nfs "$(realpath ./ocala/bin/ocala-language-server)" ~/.local/bin/
   ```
4. init.el に設定を追加します
   ```
   (add-to-list 'load-path (locate-user-emacs-file "lisp"))
   (use-package eglot)
   (use-package ocala-mode
     :mode "\\.oc\\'"
     :config (add-hook 'ocala-mode-hook #'eglot-ensure))
   ```
