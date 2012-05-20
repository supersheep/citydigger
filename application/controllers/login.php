<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');
		$this->load->library('session');
		$this->load->model('user');
		//$this->load->helper('cookie');
		$logged = $this->user->logged();
		$this->data['logged'] = $logged;
		
		$post = $this->input->post();
		$email = $this->input->post('email');
		$password = $this->input->post('password');
		
		
		
		//　若登录成功
		
		if($email && $password){
		
			$login = $this->user->login($email,$password);
		
			if($login == 1 || $logged){
				redirect('/');
			}else{
				
				if($login == -1){
					$this->data['error'] = "Email doesn't exist";
				}else if($login == -2){
					$this->data['error'] = "Password error";
				}
				
			}
		}else if($post && !$email){
			$this->data['error'] = "Please enter email";
		}else if($post && !password){
			$this->data['error'] = "Please enter password";
		}
				
		$this->data['title'] = "CityDigger - Login";
		
		$this->load->view('frag/header',$this->data);
		$this->load->view('pages/login',$this->data);
	}
}
	