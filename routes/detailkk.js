const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

// Get all DetailKK
router.get('/', (req, res) => {
    connection.query('SELECT * FROM DetailKK', (err, rows) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(200).json({ status: true, message: 'Data DetailKK', data: rows });
    });
});

// Create DetailKK
router.post('/', [
    body('no_kk').notEmpty(),
    body('nik').notEmpty(),
    body('status_hubungan_dalam_keluarga').notEmpty(),
    body('ayah').notEmpty(),
    body('ibu').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = {
        no_kk: req.body.no_kk,
        nik: req.body.nik,
        status_hubungan_dalam_keluarga: req.body.status_hubungan_dalam_keluarga,
        ayah: req.body.ayah,
        ibu: req.body.ibu,
    };

    connection.query('INSERT INTO DetailKK SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(201).json({ status: true, message: 'DetailKK has been created!', data: result });
    });
});

// Update DetailKK
router.put('/:id_detail', [
    body('no_kk').notEmpty(),
    body('nik').notEmpty(),
    body('status_hubungan_dalam_keluarga').notEmpty(),
    body('ayah').notEmpty(),
    body('ibu').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const id_detail = req.params.id_detail;
    const data = {
        no_kk: req.body.no_kk,
        nik: req.body.nik,
        status_hubungan_dalam_keluarga: req.body.status_hubungan_dalam_keluarga,
        ayah: req.body.ayah,
        ibu: req.body.ibu,
    };

    connection.query('UPDATE DetailKK SET ? WHERE id_detail = ?', [data, id_detail], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(200).json({ status: true, message: 'DetailKK has been updated!', data: result });
    });
});

router.delete('/:id_detail', (req, res) => {
    const id_detail = req.params.id_detail;

    connection.query('DELETE FROM DetailKK WHERE id_detail = ?', id_detail, (err, result) => {
        if (err) {
            console.error('Error deleting DetailKK:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(200).json({ status: true, message: 'DetailKK has been deleted!', data: result });
    });
});



module.exports = router;
