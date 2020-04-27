import { storageService } from './storageService.js'

export const emailService = {
    query,
    getById,
    add
}

const MAILS_KEY = 'mails'

var gMails = null

function _getGMails() {
    gMails = storageService.load(MAILS_KEY, gDefaultBooks);
    storageService.store(MAILS_KEY, gMails);
}


function query(searchBy = undefined, filtersBy = undefined, orderBy = {category: 'sentAt', direction: true}) {
    var mails = gMails
    if (searchBy, filtersBy) {
        mails = gMails.filter(mail => {
            return filtersBy.every(filter => mail[filter].toLowerCase().includes(searchBy))
        })
    }

    if (orderBy) {
        const orderDirection = orderBy.direction
        mails = mails.sort((a, b) => {
            const mailA = a[orderBy.category].toString().toLowerCase();
            const mailB = b[orderBy.category].toString().toLowerCase();

            if (mailA > mailB) {
                return (orderDirection) ? 1 : -1;
            }
            if (mailA < mailB) {
                return (orderDirection) ? -1 : 1;
            }
            return 0;
        });

    }
    
    return Promise.resolve(mails);
}

function add(mail) {
    gMails.push(mail)
    storageService.store(MAILS_KEY, gMails);
}

function _getIdxById(id) {
    return gMails.findIndex(book => book.id === id);
}

function getById(id) {
    return Promise.resolve(gMails.find(book => book.id === id));
}

const gDefaultBooks = [
    {
        id: 1,
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133333333
    },
    {
        id: 2,
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133000000
    },
    {
        id: 3,
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133222222
    }
];

_getGMails()