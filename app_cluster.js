const cluster = require('cluster');
const CPUs = require('os').cpus();

const startWorker = () => {
    const worker = cluster.fork();
    console.log('КЛАСТЕР: исполнитель ' + worker.id + ' запущен');
};

if(cluster.isMaster) {
    //for each cpu run startWorker
    CPUs.forEach(() => {
        startWorker();
    });

    //worker disconnection
    cluster.on('disconnect', (worker) => {
        console.log('КЛАСТЕР: исполнитель ' + worker.id + ' отключился от сервера');
    });

    //worker exit after disconnection and creating new worker
    cluster.on('exit', (worker, code, signal) => {
        console.log('КЛАСТЕР: исполнитель ' + worker.id + ' завершил работу с кодом выполнения ' + code + ' ' + signal);
        startWorker();
    });
} else {
    require('./app')();
}
