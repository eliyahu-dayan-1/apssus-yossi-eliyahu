import { storageService } from './storageService.js'
import { utilService } from './utilService.js'

export const emailService = {
    query,
    getById,
    add
}

const MAILS_KEY = 'mails'

var gEmails = null

_getGMails()

function _getGMails() {
    const gDefaultEmails = [
        _createNewEmail({
            subject: 'lorem',
            body: 'Pick up!',
            isRead: false,
            sentAt: 1551133333333,
            isReaded: false,
            isMarked: false,
            isBookmarked: false,
        }),
        _createNewEmail({
            subject: 'Wassap?',
            body: 'Pick up!',
            isRead: false,
            sentAt: 1551133000000,
            isReaded: true,
            isMarked: false,
            isImportant: false,
            isStared: false
        }),
        _createNewEmail({
            subject: 'Wassap?',
            body: 'Pick up!',
            isRead: false,
            sentAt: 1551133222222,
            isReaded: false,
            isMarked: false,
            isBookmarked: true,
            isStared: true
        })
    ];



    gEmails = storageService.load(MAILS_KEY, gDefaultEmails);
    storageService.store(MAILS_KEY, gEmails);
}


function query(searchValue = undefined, previewCategory = [], orderBy = { category: 'sentAt', direction: true }) {
    var mails = gEmails

    if (previewCategory.length && !searchValue) {
        mails = mails.filter(mail => {
            return previewCategory.some(category => {
                return mail[category] === true
        })
    })
}

if (searchValue && previewCategory) {
    mails = mails.filter(mail => {
        return previewCategory.some(category => mail[category].toLowerCase().includes(searchValue))
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
    gEmails.push(mail)
    storageService.store(MAILS_KEY, gEmails);
}

function _getIdxById(id) {
    return gEmails.findIndex(book => book.id === id);
}

function changeEmailProprty(emailId, property, value) {
    gEmails[emailId][property] = value;
    return new Promise((resolve, reject) => {
        if (gEmails[emailId][property] === value) return resolve('value is change');
        else return reject('value isnt change')
    })
}

function getById(id) {
    return Promise.resolve(gEmails.find(book => book.id === id));
}

function _createNewEmail(email) {
    const labels = {
        id: utilService.makeId(),
        isRead: false,
        isReaded: false,
        isChoose: false,
        isBookmark: false,
        isStar: false,
        isInbox: true,
        isOutBox: false,
        isDraft: false,
        isSpam: false,
    }

    for (const key in labels) {
        if (!email[key]) {
            email[key] = labels[key];

        }
    }

    return email
}



