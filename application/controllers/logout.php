<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Logout extends CI_Controller {

	public function index()
	{
		$this->load->model('user');
		$this->load->helper('url');
		
		if($this->user->logout()){
			redirect('/');
		}
	}
}
	