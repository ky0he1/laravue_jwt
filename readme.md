<p align="center"><img src="https://laravel.com/assets/img/components/logo-laravel.svg"></p>

# Laravel + tymon/jwt-auth + Vue.js + Vue Router + Vuex で開発
- 目的
  - Laravel + Vue.jsでの認証の勉強
- 機能
  - 新規登録
  - ログイン
  - ログアウト
- 認証不要
  - トップページ (誰でも閲覧可能)
  - ログインページ (新規登録のフォームを含む)
    - 新規登録するとログインを済ませユーザーページへ移動
- 認証必要
  - ユーザーページ (ユーザー名とメールアドレス表示)
    - 認証せずに``/user``にアクセスするとログインページに移動
