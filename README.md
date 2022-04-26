# vueproject

## heroku git 배포방법

heroku-cli 설치
https://devcenter.heroku.com/articles/heroku-cli

heroku login

- 프로젝트 생성시
heroku create my-project

git push heroku master

#### https://github.com/jesperorb/json-server-heroku#deploy-to-heroku


## heroku build 취소하기

heroku builds:cancel -a your-app-name

Warning: builds is not a heroku command 메세지 출력 시
heroku plugins:install heroku-builds 설치 후 실행