<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Brain extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');
		$this->load->library('session');
		$this->load->model('user');
		//$this->load->helper('cookie');
		$logged = $this->user->logged();
		$this->data['logged'] = $logged;
		
		$this->data['title'] = 'CityDigger';
			
		if($logged){
		
			$current = $this->user->current();
			
			$this->data['username'] = $current->username;
			
			$this->load->view('frag/header',$this->data);
			$this->load->view('pages/brain',$this->data);
			
		}else{
		
			$this->load->view('frag/header',$this->data);
			$this->load->view('pages/login',$this->data);
			
		}
	}
}
	