#!/usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
const package = require('./package.json')

const initAction = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: '请输入项目名称',
        name: 'name',
      },
      {
        type: 'list',
        message: '请选择项目模板',
        name: 'template',
        choices: ['koa-basic'],
      },
    ])
    .then((answers) => {
      console.log('正在拷贝项目，请稍等')
      const remote = 'https://github.com:johanazhu/koa-basic#master'
      const tarName = answers.name
      const spinner = ora('download template......').start()
      download(remote, tarName, { clone: true }, function (err) {
        if (err) {
          console.log(chalk.red(err))
          spinner.fail()
        } else {
          console.log(chalk.green('成功'))
          spinner.succeed()
        }
      })
    })
}

// 版本信息
program.version(package.version)

// 使用 init 时
program.command('init').description('创建项目').action(initAction)

program.parse(program.argv)
