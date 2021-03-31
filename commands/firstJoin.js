module.exports = {
    name: 'firstJoin',
    description: 'Quando un utente si unisce alla gilda, comincia una conversazione privata con questo per settare la guild card',
    execute(member) {
        member.send('message stub.');
        console.log('exiting firstJoin.js');
    }
}