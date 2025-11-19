/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 * 
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import Student from './src/Student.js';
import StudentManager from './src/StudentManager.js';

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  console.log('\n--- Tambah Siswa Baru ---');

  const id = readlineSync.question('ID siswa: ').trim();
  const name = readlineSync.question('Nama siswa: ').trim();
  const kelas = readlineSync.question('Kelas (misal 10A): ').trim();

  if (!id || !name) {
    console.log('ID dan Nama wajib diisi.');
    return;
  }

  if (manager.findStudent(id)) {
    console.log('ID sudah digunakan.');
    return;
  }

  const student = new Student(id, name, kelas);
  manager.addStudent(student);

  console.log('Siswa berhasil ditambahkan.');
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  console.log('\n--- Daftar Semua Siswa ---');
  manager.displayAllStudents();
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  console.log('\n--- Cari Siswa ---');
  const id = readlineSync.question('Masukkan ID: ').trim();

  const s = manager.findStudent(id);
  if (!s) {
    console.log('Siswa tidak ditemukan.');
    return;
  }

  s.displayInfo();
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  console.log('\n--- Update Data Siswa ---');
  const id = readlineSync.question('Masukkan ID: ').trim();

  const s = manager.findStudent(id);
  if (!s) {
    console.log('Siswa tidak ditemukan.');
    return;
  }

  s.displayInfo();

  const newName = readlineSync.question('Nama baru (enter untuk skip): ').trim();
  const newClass = readlineSync.question('Kelas baru (enter untuk skip): ').trim();

  manager.updateStudent(id, {
    name: newName || undefined,
    class: newClass || undefined
  });

  console.log('Data siswa berhasil diupdate.');
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  console.log('\n--- Hapus Siswa ---');
  const id = readlineSync.question('Masukkan ID: ').trim();

  const s = manager.findStudent(id);
  if (!s) {
    console.log('Siswa tidak ditemukan.');
    return;
  }

  const confirm = readlineSync.question('Yakin hapus siswa? (y/n): ').toLowerCase();
  if (confirm === 'y') {
    manager.removeStudent(id);
    console.log('Siswa berhasil dihapus.');
  } else {
    console.log('Dibatalkan.');
  }
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  console.log('\n--- Tambah Nilai Siswa ---');
  const id = readlineSync.question('Masukkan ID: ').trim();

  const s = manager.findStudent(id);
  if (!s) {
    console.log('Siswa tidak ditemukan.');
    return;
  }

  const subject = readlineSync.question('Mata pelajaran: ');
  const score = Number(readlineSync.question('Nilai (0-100): '));

  try {
    s.addGrade(subject, score);
    console.log('Nilai berhasil ditambahkan.');
  } catch (err) {
    console.log('Error:', err.message);
  }
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  console.log('\n--- Top 3 Siswa ---');

  const top = manager.getTopStudents(3);
  if (top.length === 0) {
    console.log('Belum ada data.');
    return;
  }

  top.forEach((s, i) => {
    console.log(`\n#${i + 1}`);
    s.displayInfo();
  });
}

/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');
  
  let running = true;
  
  while (running) {
    displayMenu();
    const choice = readlineSync.question('Pilih menu (1-8): ');

    switch (choice) {
      case '1': addNewStudent(); break;
      case '2': viewAllStudents(); break;
      case '3': searchStudent(); break;
      case '4': updateStudent(); break;
      case '5': deleteStudent(); break;
      case '6': addGradeToStudent(); break;
      case '7': viewTopStudents(); break;
      case '8': running = false; break;
      default: console.log('Pilihan tidak valid.');
    }
  }

  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
