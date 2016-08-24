var BaseController = function (Item) {
    var self = this;

    self.getOne = function (req, res) {
        Item.findById(req.params.id).exec(function (err, item) {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.json(item);
            }
        });
    };

    self.post = function (req, res) {
        var item = new Item(req.body.item);
        item.save(function (err) {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.json(item);
            }
        });
    };

    self.put = function (req, res) {
        Item.findOneAndUpdate({ _id: req.params.id },
            JSON.parse(req.body.item),
            { new: true })
            .exec(function (err, item) {
                if (err) {
                    console.log(err);
                    res.status(500).end();
                } else {
                    res.json(item);
                }
            });
    };

    self.delete = function (req, res) {
        Item.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log(err);
                res.status(500).end();
            } else {
                res.status(202).end();
            }
        });
    };
}

module.exports = BaseController;