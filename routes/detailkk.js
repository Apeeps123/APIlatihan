const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', (req, res) => {
    connection.query('SELECT DetailKK.id_detail, DetailKK.no_kk, DetailKK.nik, DetailKK.status_hubungan_dalam_keluarga, ktp.nama_lengkap AS ayah, ktp2.nama_lengkap AS ibu FROM DetailKK LEFT JOIN ktp ON DetailKK.ayah = ktp.nik LEFT JOIN ktp AS ktp2 ON DetailKK.ibu = ktp2.nik', (err, rows) => {
        if (err) {
            console.error('Error retrieving DetailKK data:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('DetailKK data retrieved successfully');
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
        console.error('Validation errors:', errors.array());
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
            console.error('Error creating DetailKK:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('DetailKK created successfully');
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
        console.error('Validation errors:', errors.array());
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
            console.error('Error updating DetailKK:', err);
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        console.log('DetailKK updated successfully');
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
        console.log('DetailKK deleted successfully');
        return res.status(200).json({ status: true, message: 'DetailKK has been deleted!', data: result });
    });
});

module.exports = router;
