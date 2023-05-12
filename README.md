# lab1
## Склонировать репозиторий git clone ...
## В папке проекта вызвать npm install
## В VSCode в верхнем меню выбрать "Run" и выбрать "Add configuration" для node
## Добавить файл переменных среды .env в корень проекта с содержимым PORT=3100
## Проверить содержимое файла .vscode/launch.json 
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/bin/www",
            "envFile": "${workspaceFolder}/.env"
        }
    ]
}
## Запустить сервер, для этого в меню Run выбрать запуск (c отладкой/без отладки)
