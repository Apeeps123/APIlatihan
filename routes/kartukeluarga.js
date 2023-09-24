const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const connection = require('../config/db');

router.get('/', (req, res) => {
    connection.query('SELECT * FROM KartuKeluarga', (err, rows) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(200).json({ status: true, message: 'Data KartuKeluarga', data: rows });
    });
});

router.post('/', [
    body('no_kk').notEmpty(),
    body('alamat').notEmpty(),
    body('rt').notEmpty(),
    body('rw').notEmpty(),
    body('kode_pos').notEmpty(),
    body('desa_kelurahan').notEmpty(),
    body('kecamatan').notEmpty(),
    body('kabupaten_kota').notEmpty(),
    body('provinsi').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = {
        no_kk: req.body.no_kk,
        alamat: req.body.alamat,
        rt: req.body.rt,
        rw: req.body.rw,
        kode_pos: req.body.kode_pos,
        desa_kelurahan: req.body.desa_kelurahan,
        kecamatan: req.body.kecamatan,
        kabupaten_kota: req.body.kabupaten_kota,
        provinsi: req.body.provinsi,
    };

    connection.query('INSERT INTO KartuKeluarga SET ?', data, (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(201).json({ status: true, message: 'KartuKeluarga has been created!', data: result });
    });
});

router.put('/:no_kk', [
    body('alamat').notEmpty(),
    body('rt').notEmpty(),
    body('rw').notEmpty(),
    body('kode_pos').notEmpty(),
    body('desa_kelurahan').notEmpty(),
    body('kecamatan').notEmpty(),
    body('kabupaten_kota').notEmpty(),
    body('provinsi').notEmpty(),
], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const no_kk = req.params.no_kk;
    const data = {
        alamat: req.body.alamat,
        rt: req.body.rt,
        rw: req.body.rw,
        kode_pos: req.body.kode_pos,
        desa_kelurahan: req.body.desa_kelurahan,
        kecamatan: req.body.kecamatan,
        kabupaten_kota: req.body.kabupaten_kota,
        provinsi: req.body.provinsi,
    };

    connection.query('UPDATE KartuKeluarga SET ? WHERE no_kk = ?', [data, no_kk], (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(200).json({ status: true, message: 'KartuKeluarga has been updated!', data: result });
    });
});

router.delete('/:no_kk', (req, res) => {
    const no_kk = req.params.no_kk;

    connection.query('DELETE FROM KartuKeluarga WHERE no_kk = ?', no_kk, (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Server Error' });
        }
        return res.status(200).json({ status: true, message: 'KartuKeluarga has been deleted!', data: result });
    });
});

module.exports = router;
