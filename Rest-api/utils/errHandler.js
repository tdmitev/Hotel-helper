function errorHandler(err, req, res, next) {
    if (err.status === 333) {
        res.status(333)
            .json({ message: 'ErrorHandler: not allowed!' })
    } else {
        console.error(err.stack); // Това ще отпечата стека на извикване в конзолата
        res.status(500)
            .json({ 
                message: 'ErrorHandler: Something went wrong!',
                error: err.message, // Показва съобщението на грешката
                stack: err.stack // Можете да изпратите стека на клиента, но обикновено това не е препоръчително в продукционна среда
            });
    }
}

module.exports = errorHandler;