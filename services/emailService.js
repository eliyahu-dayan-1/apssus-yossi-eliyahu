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


function query(filterBy = undefined) {
    var mails = gMails
    if (filterBy) {
        var { name, maxPrice, minPrice } = filterBy
        maxPrice = maxPrice ? maxPrice : Infinity
        minPrice = minPrice ? minPrice : 0
        mails = gMails.filter(book => book.title.includes(name)
            && (book.listPrice.amount < maxPrice)
            && book.listPrice.amount > minPrice)
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
        sentAt: 1551133930594
    },
    {
        id: 2,
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594
    },
    {
        id: 3,
        subject: 'Wassap?',
        body: 'Pick up!',
        isRead: false,
        sentAt: 1551133930594
    }
];

_getGMails()