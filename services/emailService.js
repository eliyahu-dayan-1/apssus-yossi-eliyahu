import { storageService } from './storageService.js'
import { utilService } from './utilService.js'

export const emailService = {
    query,
    getById,
    add,
    toggleLabel,
    addEmail,
    deleteEmailById,
}

const MAILS_KEY = 'mails'

var gEmails = null

_getGMails()

function _getGMails() {
    const gDefaultEmails = [
        _createNewEmail({
            from: 'dayan0544@gmail.com',
            to: 'jon@gmail.com',
            mailedBy: 'eliyahu dayan',
            subject: 'lorem',
            body: 'Welcome to Academia.edu! 46,220,726 academics have joined the Academia.edu platform, and they have uploaded 16,918,538 papers in total.',
            sentAt: 1551133333333,
            isInbox: false,
            isOutbox: true,
            isRead: false,
            isMarked: false,
            isBookmarked: false,
            isTrash: false,
        }),
        _createNewEmail({
            from: 'dayan0544@gmail.com',
            to: 'jon@gmail.com',
            mailedBy: 'eliyahu dayan',
            subject: 'Wassap?',
            body: 'Welcome to Academia.edu! 46,220,726 academics have joined the Academia.edu platform, and they have uploaded 16,918,538 papers in total.!',
            sentAt: 1551133333333,
            isInbox: false,
            isOutbox: true,
            isRead: false,
            isMarked: false,
            isBookmarked: false,
            isTrash: false,
            isStar: true,
        }),
        _createNewEmail({
            from: 'dayan0544@gmail.com',
            to: 'jon@gmail.com',
            mailedBy: 'eliyahu dayan',
            subject: 'Wassap?',
            body: 'Artificial Intelligence has revolutionized many industries in the past dec‍ade, and healthcare is no exception. In fact, over half of healthcare professionals expect to use artificial intelligence in the ne‍xt 5‍ y‍ears.!',
            sentAt: 1551133333333,
            isInbox: false,
            isOutbox: true,
            isRead: false,
            isMarked: false,
            isBookmarked: false,
            isTrash: false,
            isStar: true,
        }),
        _createNewEmail({
            from: 'dayan0544@gmail.com',
            to: 'jon@gmail.com',
            mailedBy: 'eliyahu dayan',
            subject: 'Wassap?',
            body: 'Welcome to Academia.edu! 46,220,726 academics have joined the Academia.edu platform, and they have uploaded 16,918,538 papers in total.!',
            sentAt: 1551133333333,
            isInbox: false,
            isOutbox: true,
            isRead: false,
            isMarked: false,
            isBookmarked: false,
            isTrash: false,
            isStar: true,
        }),
        _createNewEmail({
            from: 'dayan0544@gmail.com',
            to: 'jon@gmail.com',
            mailedBy: 'eliyahu dayan',
            subject: 'Wassap?',
            body: 'Welcome to Academia.edu! 46,220,726 academics have joined the Academia.edu platform, and they have uploaded 16,918,538 papers in total.!',
            sentAt: 1551133333333,
            isInbox: false,
            isOutbox: true,
            isRead: false,
            isMarked: false,
            isBookmarked: false,
            isTrash: false,
            isStar: true,
        }),
        _createNewEmail({
            from: 'dayan0544@gmail.com',
            to: 'jon@gmail.com',
            mailedBy: 'eliyahu dayan',
            subject: 'Wassap?',
            body: 'Welcome to Academia.edu! 46,220,726 academics have joined the Academia.edu platform, and they have uploaded 16,918,538 papers in total.!',
            sentAt: 1551133333333,
            isInbox: false,
            isOutbox: true,
            isRead: false,
            isMarked: false,
            isBookmarked: false,
            isTrash: false,
            isStar: true,
        }),
        _createNewEmail({
            from: 'dayan0544@gmail.com',
            to: 'jon@gmail.com',
            mailedBy: 'eliyahu dayan',
            subject: 'Wassap?',
            body: 'Welcome to Academia.edu! 46,220,726 academics have joined the Academia.edu platform, and they have uploaded 16,918,538 papers in total.!',
            sentAt: 1551133333333,
            isInbox: false,
            isOutbox: true,
            isRead: false,
            isMarked: false,
            isBookmarked: false,
            isTrash: false,
            isStar: true,
        }),
        _createNewEmail({
            from: 'dayan0544@gmail.com',
            to: 'jon@gmail.com',
            mailedBy: 'eliyahu dayan',
            subject: 'Wassap?',
            body: 'Welcome to Academia.edu! 46,220,726 academics have joined the Academia.edu platform, and they have uploaded 16,918,538 papers in total.!',
            sentAt: 1551133333333,
            isInbox: true,
            isOutbox: false,
            isRead: false,
            isMarked: false,
            isBookmarked: false,
            isTrash: false,
            isStar: true,
        }),
    ];

    gEmails = storageService.load(MAILS_KEY, gDefaultEmails);
    storageService.store(MAILS_KEY, gEmails);
}

function addEmail(email) {
    const newMail = _createNewEmail(email);

    gEmails.push(newMail)
    storageService.store(MAILS_KEY, gEmails);
}

function deleteEmailById(id) {
    const email = gEmails.find(email => email.id === id)
    email.isTrash = true
    storageService.store(MAILS_KEY, gEmails);
    return Promise.resolve(gEmails);
}


function query(searchValue = undefined, previewCategory = [], orderBy = { category: 'sentAt', direction: true }) {
    var mails = gEmails
    if (previewCategory.length && !searchValue) {
        mails = mails.filter(mail => {
            return previewCategory.some(category => {
                if (mail.isTrash && category !== 'isTrash') return false;
                return mail[category] === true;
            })
        })
    }

    if (searchValue && previewCategory) {
        mails = mails.filter(mail => {
            return previewCategory.some(category => {
                return mail[category].toString().toLowerCase().includes(searchValue)
            })
        })
    }


    if (orderBy) {
        const orderDirection = orderBy.direction
        mails = mails.sort((a, b) => {
            const mailA = a[orderBy.category].toString().toLowerCase();
            const mailB = b[orderBy.category].toString().toLowerCase();

            if (mailA > mailB) {
                return (orderDirection) ? -1 : -1;
            }
            if (mailA < mailB) {
                return (orderDirection) ? 1 : -1;
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

function toggleLabel(label, id) {
    const email = gEmails.find(email => email.id === id)
    email[label] = !email[label]
    storageService.store(MAILS_KEY, gEmails)
    return Promise.resolve('successful save');
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
        isChoose: false,
        isBookmark: false,
        isStar: false,
        isInbox: false,
        isOutbox: true,
        isDraft: false,
        isSpam: false,
        isRead: false,
        isMark: false,
        isBookmark: false,
        isTrash: false,
    }

    for (const key in labels) {
        if (!email[key]) {
            email[key] = labels[key];

        }
    }

    return email
}



